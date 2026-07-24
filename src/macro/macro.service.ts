import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FredAdapter, FRED_SERIES } from '../adapters/fred.adapter';
import { PolymarketAdapter } from '../adapters/polymarket.adapter';
import { BarsService } from '../bars/bars.service';
import { PrismaService } from '../prisma/prisma.service';
import { Asset, Freq } from '@prisma/client';

const FRED_SYMBOLS = Object.keys(FRED_SERIES);

@Injectable()
export class MacroService {
  private readonly logger = new Logger(MacroService.name);
  private macroSyncing = false;

  constructor(
    private fred: FredAdapter,
    private polymarket: PolymarketAdapter,
    private barsService: BarsService,
    private prisma: PrismaService,
  ) {}

  private async withTimeout<T>(label: string, fn: () => Promise<T>, ms = 30000): Promise<T> {
    return Promise.race([
      fn(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms),
      ),
    ]);
  }

  async syncFred(): Promise<Record<string, number>> {
    const result: Record<string, number> = {};
    for (const sym of FRED_SYMBOLS) {
      try {
        const latest = await this.withTimeout(`latestTs ${sym}`, () =>
          this.barsService.latestTs(Asset.macro, sym, Freq.d1),
        );
        let bars;
        if (latest === null) {
          bars = await this.fred.fetchHistory(sym);
        } else {
          bars = await this.fred.fetchSince(sym, latest);
        }
        if (bars.length > 0) {
          await this.withTimeout(`upsert ${sym}`, () =>
            this.barsService.batchUpsert(Asset.macro, Freq.d1, bars),
          );
        }
        result[sym] = bars.length;
        this.logger.log(`syncFred ${sym}: ${bars.length} rows`);
        await new Promise((r) => setTimeout(r, 500));
      } catch (e) {
        this.logger.warn(`syncFred ${sym} failed: ${e}`);
        result[sym] = -1;
      }
    }
    return result;
  }

  async syncPolymarket(): Promise<number> {
    try {
      const markets = await this.polymarket.fetchActive(200);
      let count = 0;
      for (const m of markets) {
        await this.prisma.macroMarket.upsert({
          where: { id: m.id },
          create: {
            id: m.id,
            question: m.question,
            slug: m.slug,
            yesProb: m.yesProb,
            vol24h: m.vol24h,
            volTotal: m.volTotal,
            endDate: m.endDate,
            active: m.active,
          },
          update: {
            question: m.question,
            slug: m.slug,
            yesProb: m.yesProb,
            vol24h: m.vol24h,
            volTotal: m.volTotal,
            endDate: m.endDate,
            active: m.active,
          },
        });
        count++;
      }
      // Mark markets no longer returned as inactive
      const activeIds = markets.map((m) => m.id);
      if (activeIds.length > 0) {
        await this.prisma.macroMarket.updateMany({
          where: { id: { notIn: activeIds }, active: true },
          data: { active: false },
        });
      }
      this.logger.log(`syncPolymarket: ${count} markets upserted`);
      return count;
    } catch (e) {
      this.logger.error(`syncPolymarket failed: ${e}`);
      return -1;
    }
  }

  async manualSyncMacro() {
    if (this.macroSyncing) return { skipped: true, reason: 'macro sync already running' };
    this.macroSyncing = true;
    try {
      const fredResult = await this.syncFred();
      const polyCount = await this.syncPolymarket();
      return { fred: fredResult, polymarket: polyCount };
    } catch (e) {
      this.logger.error(`manual macro sync failed: ${e}`);
      return { error: String(e) };
    } finally {
      this.macroSyncing = false;
    }
  }

  @Cron('0 9 * * 1-5')
  async syncMacroDaily() {
    if (this.macroSyncing) {
      this.logger.warn('macro sync already running, skip');
      return;
    }
    this.macroSyncing = true;
    try {
      this.logger.log('=== macro daily sync start ===');
      await this.syncFred();
      await this.syncPolymarket();
      this.logger.log('=== macro daily sync done ===');
    } catch (e) {
      this.logger.error(`macro sync failed: ${e}`);
    } finally {
      this.macroSyncing = false;
    }
  }

  async listMacroMarkets(activeOnly = true) {
    return this.prisma.macroMarket.findMany({
      where: activeOnly ? { active: true } : undefined,
      orderBy: { vol24h: 'desc' },
      take: 200,
    });
  }
}
