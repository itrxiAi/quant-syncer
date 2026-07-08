import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AdminService } from '../admin/admin.service';
import { AkshareAdapter } from '../adapters/akshare.adapter';
import { BinanceAdapter, FREQ_MS } from '../adapters/binance.adapter';
import { BarsService } from '../bars/bars.service';
import { PrismaService } from '../prisma/prisma.service';
import { Asset, Freq } from '@prisma/client';

const CRYPTO_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'DOGEUSDT'];
const CRYPTO_FREQS = ['m5', 'm15', 'h1', 'h4', 'd1'];

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  private ashareSyncing = false;
  private cryptoSyncing = false;

  constructor(
    private adminService: AdminService,
    private akshare: AkshareAdapter,
    private binance: BinanceAdapter,
    private barsService: BarsService,
    private prisma: PrismaService,
  ) {}

  async syncAShareSpot() {
    this.logger.log('syncing ashare spot...');
    const { bars, vendor } = await this.akshare.fetchSpot();
    this.logger.log(`fetchSpot: ${bars.length} symbols from ${vendor}`);
    const totalRows = await this.barsService.batchUpsert(Asset.ashare, Freq.d1, bars);
    this.logger.log(`syncAShareSpot done: ${totalRows} rows`);
    return { symbols: bars.length, rows: totalRows, vendor };
  }

  /**
   * crypto catch-up：查本地 latest_ts，若已有数据则用 fetchRange 精确拉 [latest+step, now]
   * 的缺口；首次(无数据)用 fetchRecent(600) 起步做种子数据。
   * 无论停机多久，都能补齐，不再依赖固定 600 根窗口。
   */
  async syncCrypto(symbols: string[], freqs: string[]) {
    const result: Record<string, number> = {};
    for (const sym of symbols) {
      for (const freq of freqs) {
        const key = `${sym}@${freq}`;
        try {
          const latest = await this.barsService.latestTs(Asset.crypto, sym, freq as Freq);
          let bars;
          if (latest === null) {
            bars = await this.binance.fetchRecent(sym, freq, 600);
          } else {
            const stepMs = FREQ_MS[freq];
            bars = await this.binance.fetchRange(sym, freq, latest.getTime() + stepMs);
          }
          if (bars.length > 0) {
            await this.barsService.batchUpsert(Asset.crypto, freq as Freq, bars);
            result[key] = bars.length;
          } else {
            result[key] = 0;
          }
        } catch (e) {
          this.logger.warn(`${key} failed: ${e}`);
          result[key] = -1;
        }
      }
    }
    return result;
  }

  async syncCalendar() {
    const days = await this.akshare.fetchTradeCalendar();
    let count = 0;
    for (const d of days) {
      await this.prisma.calendar.upsert({
        where: { date: new Date(d.date) },
        create: { date: new Date(d.date), isOpen: d.isOpen, asset: Asset.ashare },
        update: { isOpen: d.isOpen },
      });
      count++;
    }
    this.logger.log(`syncCalendar: ${count} days`);
    return { days: count };
  }

  /**
   * 统一的 A 股 catch-up：检查每个 symbol 的 latest_ts，落后于最近交易日则用
   * fetchHistory 拉全量补齐。首次运行(DB 为空)时对所有 symbol 都会触发，
   * 效果等价于全量 backfill；稳态下(每天正常跑过) laggard≈0，接近零成本。
   */
  async catchUpAshare() {
    const { bars: spotBars } = await this.akshare.fetchSpot();
    const universe = spotBars.map((b) => b.symbol);
    const existingSymbols = await this.barsService.listSymbols(Asset.ashare, Freq.d1);
    const allSymbols = Array.from(new Set([...universe, ...existingSymbols]));

    const lastTradingDay = await this.getLastCompletedTradingDay();

    let checked = 0;
    let healed = 0;
    let healedRows = 0;
    const errors: string[] = [];

    for (const sym of allSymbols) {
      checked++;
      if (checked % 500 === 0) this.logger.log(`catchUpAshare: checked ${checked}/${allSymbols.length}`);

      const latest = await this.barsService.latestTs(Asset.ashare, sym, Freq.d1);
      if (latest !== null && lastTradingDay !== null && latest >= lastTradingDay) {
        continue; // already up to date
      }

      try {
        const { bars } = await this.akshare.fetchHistory(sym, latest ? this.addDays(latest, 1).toISOString() : undefined);
        if (bars.length > 0) {
          await this.barsService.batchUpsert(Asset.ashare, Freq.d1, bars);
          healed++;
          healedRows += bars.length;
        }
      } catch (e) {
        errors.push(`${sym}: ${e}`);
      }
      // 限速: 每次请求间隔 200ms，避免东财限流
      await new Promise((r) => setTimeout(r, 200));
    }

    this.logger.log(`catchUpAshare: ${checked} checked, ${healed} healed, ${healedRows} rows, ${errors.length} errors`);
    return { checked, healed, healedRows, errors: errors.slice(0, 20) };
  }

  private addDays(d: Date, n: number): Date {
    const out = new Date(d);
    out.setDate(out.getDate() + n);
    return out;
  }

  private async getLastCompletedTradingDay(): Promise<Date | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const row = await this.prisma.calendar.findFirst({
      where: { asset: Asset.ashare, isOpen: true, date: { lte: today } },
      orderBy: { date: 'desc' },
    });
    return row?.date ?? null;
  }

  @Cron('30 18 * * 1-5')
  async syncAShareDaily() {
    if (this.ashareSyncing) {
      this.logger.warn('ashare sync already running, skip');
      return;
    }
    this.ashareSyncing = true;
    try {
      this.logger.log('=== ashare daily sync start ===');
      await this.syncCalendar();
      await this.catchUpAshare();
      await this.syncAShareSpot();
      this.logger.log('=== ashare daily sync done ===');
    } catch (e) {
      this.logger.error(`ashare sync failed: ${e}`);
    } finally {
      this.ashareSyncing = false;
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async syncCryptoContinuous() {
    if (this.cryptoSyncing) {
      this.logger.warn('crypto sync already running, skip');
      return;
    }
    this.cryptoSyncing = true;
    try {
      await this.syncCrypto(CRYPTO_SYMBOLS, CRYPTO_FREQS);
    } catch (e) {
      this.logger.error(`crypto sync failed: ${e}`);
    } finally {
      this.cryptoSyncing = false;
    }
  }

  @Cron('0 10 1 * *') // 每月1号10点同步指数成分股
  async syncIndexMonthly() {
    if (this.ashareSyncing) {
      this.logger.warn('ashare sync running, skip index sync');
      return;
    }
    this.ashareSyncing = true;
    try {
      this.logger.log('=== index monthly sync start ===');
      await this.adminService.syncIndex('csi300', '000300', '沪深300');
      await this.adminService.syncIndex('csi500', '000905', '中证500');
      await this.adminService.syncIndex('csi1000', '000852', '中证1000');
      this.logger.log('=== index monthly sync done ===');
    } catch (e) {
      this.logger.error(`index sync failed: ${e}`);
    } finally {
      this.ashareSyncing = false;
    }
  }

  async runOnce(asset: string) {
    if (asset === 'ashare') {
      await this.syncCalendar();
      await this.catchUpAshare();
      await this.syncAShareSpot();
    } else if (asset === 'crypto') {
      await this.syncCrypto(CRYPTO_SYMBOLS, CRYPTO_FREQS);
    }
  }
}
