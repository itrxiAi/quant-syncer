import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Asset, Freq } from '@prisma/client';

const BATCH_SIZE = 500;
const MAX_ROWS = 200000;
const MAX_RANGE_DAYS_BY_FREQ: Record<string, number> = {
  d1: 10950,   // 30 years × ~250 trading days = ~7500 rows/symbol
  h4: 3650,    // 10 years × ~2190 bars/year = ~21900 rows/symbol
  h1: 2190,    // 6 years × ~8760 bars/year = ~52560 rows/symbol
  m15: 1095,   // 3 years × ~35040 bars/year = ~105120 rows/symbol
  m5: 548,     // 1.5 years × ~105120 bars/year = ~157680 rows/symbol
};

export interface BarInput {
  ts: Date;
  symbol: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
  amount: number | null;
  factor: number;
  takerBuyBaseVolume?: number | null;
  vendor: string;
}

@Injectable()
export class BarsService {
  constructor(private prisma: PrismaService) {}

  async findBars(params: {
    asset: Asset;
    symbol?: string;
    symbols?: string[];
    index?: string;
    freq: Freq;
    start?: string;
    end?: string;
    fields?: string[];
    pageToken?: string;
  }) {
    const where: any = {
      asset: params.asset,
      freq: params.freq,
    };

    let multiSymbol = false;
    if (params.symbol) {
      where.symbol = params.symbol;
    } else if (params.symbols && params.symbols.length > 0) {
      where.symbol = { in: params.symbols };
      multiSymbol = params.symbols.length > 1;
    } else if (params.index) {
      const members = await this.prisma.indexMember.findMany({
        where: {
          indexCode: params.index,
          outDate: null,
        },
        select: { symbol: true },
      });
      where.symbol = { in: members.map((m) => m.symbol) };
      multiSymbol = true;
    }

    if (multiSymbol && !params.start && !params.end) {
      throw new BadRequestException('start and/or end date range is required when querying multiple symbols or an index');
    }

    if (params.start || params.end) {
      where.ts = {};
      if (params.start) where.ts.gte = new Date(params.start);
      if (params.end) where.ts.lte = new Date(params.end);

      if (params.start && params.end) {
        const days = (new Date(params.end).getTime() - new Date(params.start).getTime()) / 86400000;
        const maxDays = MAX_RANGE_DAYS_BY_FREQ[params.freq] ?? 365;
        if (days > maxDays) {
          throw new BadRequestException(`date range too large for freq=${params.freq} (max ${maxDays} days)`);
        }
      }
    }

    // Cursor pagination: decode pageToken = base64(lastSymbol|lastTsISO)
    if (params.pageToken) {
      const decoded = Buffer.from(params.pageToken, 'base64').toString('utf-8');
      const sep = decoded.lastIndexOf('|');
      const cursorSymbol = decoded.slice(0, sep);
      const cursorTs = new Date(decoded.slice(sep + 1));
      where.OR = [
        { symbol: { gt: cursorSymbol } },
        { symbol: cursorSymbol, ts: { gt: cursorTs } },
      ];
    }

    const select: any = {};
    if (params.fields && params.fields.length > 0) {
      select.ts = true;
      select.symbol = true;
      for (const f of params.fields) {
        if (['open', 'high', 'low', 'close', 'volume', 'amount', 'factor', 'takerBuyBaseVolume', 'vendor'].includes(f)) {
          select[f] = true;
        }
      }
    }

    const rows = await this.prisma.bar.findMany({
      where,
      orderBy: [{ symbol: 'asc' }, { ts: 'asc' }],
      take: MAX_ROWS,
      ...(Object.keys(select).length > 0 ? { select } : {}),
    });

    let nextPageToken: string | undefined;
    if (rows.length === MAX_ROWS) {
      const last = rows[rows.length - 1];
      nextPageToken = Buffer.from(`${last.symbol}|${last.ts.toISOString()}`, 'utf-8').toString('base64');
    }

    return { bars: rows, next_page_token: nextPageToken ?? null };
  }

  async batchUpsert(asset: Asset, freq: Freq, bars: BarInput[]): Promise<number> {
    let count = 0;
    for (let i = 0; i < bars.length; i += BATCH_SIZE) {
      const batch = bars.slice(i, i + BATCH_SIZE);
      const placeholders = batch.map((_, idx) => {
        const off = idx * 13;
        return `($${off + 1}, $${off + 2}, $${off + 3}::"Asset", $${off + 4}::"Freq", $${off + 5}, $${off + 6}, $${off + 7}, $${off + 8}, $${off + 9}, $${off + 10}, $${off + 11}, $${off + 12}, $${off + 13})`;
      }).join(', ');

      const params: any[] = [];
      for (const b of batch) {
        params.push(
          b.ts, b.symbol, asset, freq,
          b.open, b.high, b.low, b.close,
          b.volume, b.amount, b.factor ?? 1,
          b.takerBuyBaseVolume ?? null,
          b.vendor,
        );
      }

      const sql = `INSERT INTO "bar" (ts, symbol, asset, freq, open, high, low, close, volume, amount, factor, taker_buy_base_volume, vendor)
        VALUES ${placeholders}
        ON CONFLICT (ts, symbol, asset, freq) DO UPDATE SET
          open = EXCLUDED.open, high = EXCLUDED.high, low = EXCLUDED.low, close = EXCLUDED.close,
          volume = EXCLUDED.volume, amount = EXCLUDED.amount, factor = EXCLUDED.factor,
          taker_buy_base_volume = EXCLUDED.taker_buy_base_volume, vendor = EXCLUDED.vendor`;

      await this.prisma.$executeRawUnsafe(sql, ...params);
      count += batch.length;
    }
    return count;
  }

  async latestTs(asset: Asset, symbol: string, freq: Freq) {
    const row = await this.prisma.bar.findFirst({
      where: { asset, symbol, freq },
      orderBy: { ts: 'desc' },
      select: { ts: true },
    });
    return row?.ts ?? null;
  }

  // 全市场 symbol 目录用伪指数(all_ashare/all_crypto)承载：上市=inDate，退市=outDate，
  // 语义与真实指数成分股完全一致，避免对上百万行的 bar 表做 DISTINCT 扫描。
  private allSymbolsIndexCode(asset: Asset) {
    return asset === Asset.ashare ? 'all_ashare' : 'all_crypto';
  }

  async ensureSymbolsRegistered(asset: Asset, symbols: string[]) {
    const indexCode = this.allSymbolsIndexCode(asset);
    await this.prisma.index.upsert({
      where: { code: indexCode },
      create: { code: indexCode, name: `All ${asset} symbols`, asset },
      update: {},
    });

    const existing = await this.prisma.indexMember.findMany({
      where: { indexCode, outDate: null },
      select: { symbol: true },
    });
    const existingSet = new Set(existing.map((m) => m.symbol));
    const today = new Date();
    let added = 0;
    for (const sym of symbols) {
      if (existingSet.has(sym)) continue;
      await this.prisma.indexMember.upsert({
        where: { indexCode_symbol_inDate: { indexCode, symbol: sym, inDate: today } },
        create: { indexCode, symbol: sym, inDate: today },
        update: {},
      });
      added++;
    }
    return { total: symbols.length, added };
  }

  async listSymbols(asset: Asset, freq: Freq) {
    if (asset === Asset.ashare) {
      const rows = await this.prisma.indexMember.findMany({
        where: { indexCode: this.allSymbolsIndexCode(asset) },
        select: { symbol: true },
        distinct: ['symbol'],
        orderBy: { symbol: 'asc' },
      });
      return rows.map((r) => r.symbol);
    }
    const rows = await (this.prisma as any).$queryRawUnsafe(
      `SELECT DISTINCT symbol FROM "bar" WHERE asset = $1::"Asset" AND freq = $2::"Freq" ORDER BY symbol`,
      asset, freq,
    ) as any[];
    return rows.map((r) => r.symbol);
  }

  async listLatest(asset: Asset, freq: Freq) {
    const rows = await (this.prisma as any).$queryRawUnsafe(
      `SELECT symbol, MAX(ts) AS ts
       FROM "bar"
       WHERE asset = $1::"Asset" AND freq = $2::"Freq"
       GROUP BY symbol ORDER BY symbol`,
      asset, freq,
    ) as any[];
    const result: Record<string, string | null> = {};
    for (const r of rows) {
      result[r.symbol] = r.ts ? new Date(r.ts).toISOString() : null;
    }
    return result;
  }
}
