import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Asset, Freq } from '../../generated/prisma/client';

const BATCH_SIZE = 500;

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
  }) {
    const where: any = {
      asset: params.asset,
      freq: params.freq,
    };

    if (params.symbol) {
      where.symbol = params.symbol;
    } else if (params.symbols && params.symbols.length > 0) {
      where.symbol = { in: params.symbols };
    } else if (params.index) {
      const members = await this.prisma.indexMember.findMany({
        where: {
          indexCode: params.index,
          outDate: null,
        },
        select: { symbol: true },
      });
      where.symbol = { in: members.map((m) => m.symbol) };
    }

    if (params.start || params.end) {
      where.ts = {};
      if (params.start) where.ts.gte = new Date(params.start);
      if (params.end) where.ts.lte = new Date(params.end);
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

    return this.prisma.bar.findMany({
      where,
      orderBy: [{ symbol: 'asc' }, { ts: 'asc' }],
      ...(Object.keys(select).length > 0 ? { select } : {}),
    });
  }

  async batchUpsert(asset: Asset, freq: Freq, bars: BarInput[]): Promise<number> {
    let count = 0;
    for (let i = 0; i < bars.length; i += BATCH_SIZE) {
      const batch = bars.slice(i, i + BATCH_SIZE);
      const placeholders = batch.map((_, idx) => {
        const off = idx * 12;
        return `($${off + 1}, $${off + 2}, $${off + 3}, $${off + 4}, $${off + 5}, $${off + 6}, $${off + 7}, $${off + 8}, $${off + 9}, $${off + 10}, $${off + 11}, $${off + 12})`;
      }).join(', ');

      const params: any[] = [];
      for (const b of batch) {
        params.push(
          b.ts, b.symbol, asset, freq,
          b.open, b.high, b.low, b.close,
          b.volume, b.amount, b.factor ?? 1,
          b.vendor,
        );
      }

      const sql = `INSERT INTO "bar" (ts, symbol, asset, freq, open, high, low, close, volume, amount, factor, vendor)
        VALUES ${placeholders}
        ON CONFLICT (ts, symbol, asset, freq) DO UPDATE SET
          open = EXCLUDED.open, high = EXCLUDED.high, low = EXCLUDED.low, close = EXCLUDED.close,
          volume = EXCLUDED.volume, amount = EXCLUDED.amount, factor = EXCLUDED.factor, vendor = EXCLUDED.vendor`;

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

  async listSymbols(asset: Asset, freq: Freq) {
    const rows = await this.prisma.bar.findMany({
      where: { asset, freq },
      distinct: ['symbol'],
      select: { symbol: true },
    });
    return rows.map((r) => r.symbol).sort();
  }

  async listLatest(asset: Asset, freq: Freq) {
    const symbols = await this.listSymbols(asset, freq);
    const result: Record<string, string | null> = {};
    for (const sym of symbols) {
      const ts = await this.latestTs(asset, sym, freq);
      result[sym] = ts ? ts.toISOString() : null;
    }
    return result;
  }
}
