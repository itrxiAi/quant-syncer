import { Logger } from '@nestjs/common';
import axios from 'axios';
import { BarRow } from './types';

const logger = new Logger('BinanceAdapter');

const BASE_URL = 'https://fapi.binance.com/fapi/v1';
const MAX_LIMIT = 1500;

const FREQ_MAP: Record<string, string> = {
  m5: '5m',
  m15: '15m',
  h1: '1h',
  h4: '4h',
  d1: '1d',
};

export const FREQ_MS: Record<string, number> = {
  m5: 5 * 60 * 1000,
  m15: 15 * 60 * 1000,
  h1: 60 * 60 * 1000,
  h4: 4 * 60 * 60 * 1000,
  d1: 24 * 60 * 60 * 1000,
};

export class BinanceAdapter {
  async fetchRecent(symbol: string, freq: string, limit: number = 600): Promise<BarRow[]> {
    const interval = FREQ_MAP[freq];
    if (!interval) throw new Error(`unsupported freq: ${freq}`);

    const sym = symbol.replace('/', '').toUpperCase();
    const url = `${BASE_URL}/klines?symbol=${sym}&interval=${interval}&limit=${Math.min(limit, MAX_LIMIT)}`;

    const data = await this.curlJson(url);
    if (data === null) throw new Error(`fetchRecent ${symbol}@${freq}: all retries failed`);
    if (!Array.isArray(data)) return [];

    return this.parseKlines(data, symbol, freq);
  }

  async fetchRange(symbol: string, freq: string, startMs: number, endMs?: number): Promise<BarRow[]> {
    const interval = FREQ_MAP[freq];
    if (!interval) throw new Error(`unsupported freq: ${freq}`);

    const sym = symbol.replace('/', '').toUpperCase();
    const end = endMs ?? Date.now();
    const stepMs = FREQ_MS[freq];
    const all: BarRow[] = [];
    let cur = startMs;

    while (cur < end) {
      const url = `${BASE_URL}/klines?symbol=${sym}&interval=${interval}&startTime=${cur}&endTime=${end}&limit=${MAX_LIMIT}`;
      const data = await this.curlJson(url);
      if (data === null) throw new Error(`fetchRange ${symbol}@${freq}: all retries failed at ${cur}`);
      if (!Array.isArray(data) || data.length === 0) break;

      const bars = this.parseKlines(data, symbol, freq);
      all.push(...bars);

      const lastOpenMs = parseInt(data[data.length - 1][0]);
      if (data.length < MAX_LIMIT || lastOpenMs + stepMs >= end) break;
      cur = lastOpenMs + stepMs;
      await new Promise((r) => setTimeout(r, 250));
    }

    return all;
  }

  async fetchRangeStream(
    symbol: string,
    freq: string,
    startMs: number,
    onBatch: (bars: BarRow[]) => Promise<void>,
    endMs?: number,
  ): Promise<number> {
    const interval = FREQ_MAP[freq];
    if (!interval) throw new Error(`unsupported freq: ${freq}`);

    const sym = symbol.replace('/', '').toUpperCase();
    const end = endMs ?? Date.now();
    const stepMs = FREQ_MS[freq];
    let cur = startMs;
    let total = 0;

    while (cur < end) {
      const url = `${BASE_URL}/klines?symbol=${sym}&interval=${interval}&startTime=${cur}&endTime=${end}&limit=${MAX_LIMIT}`;
      const data = await this.curlJson(url);
      if (data === null) throw new Error(`fetchRangeStream ${symbol}@${freq}: all retries failed at ${cur}`);
      if (!Array.isArray(data) || data.length === 0) break;

      const bars = this.parseKlines(data, symbol, freq);
      if (bars.length > 0) {
        await onBatch(bars);
        total += bars.length;
      }

      const lastOpenMs = parseInt(data[data.length - 1][0]);
      if (data.length < MAX_LIMIT || lastOpenMs + stepMs >= end) break;
      cur = lastOpenMs + stepMs;
      await new Promise((r) => setTimeout(r, 250));
    }

    return total;
  }

  private parseKlines(data: any[][], symbol: string, freq: string): BarRow[] {
    const stepMs = FREQ_MS[freq];
    const now = Date.now();
    const rows: BarRow[] = [];

    for (const k of data) {
      const openTime = parseInt(k[0]);
      if (openTime + stepMs > now) continue; // drop unclosed bar

      rows.push({
        ts: new Date(openTime),
        symbol,
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5]),
        amount: parseFloat(k[7]),
        factor: 1,
        takerBuyBaseVolume: parseFloat(k[9]),
        vendor: 'binance_fapi',
      });
    }

    // dedup keep last
    const seen = new Map<number, BarRow>();
    for (const r of rows) {
      seen.set(r.ts.getTime(), r);
    }
    return Array.from(seen.values()).sort((a, b) => a.ts.getTime() - b.ts.getTime());
  }

  private async curlJson(url: string, retries: number = 5): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await axios.get(url, { timeout: 15000 });
        return res.data;
      } catch (e) {
        logger.warn(`curl attempt ${i + 1}/${retries} failed: ${e}`);
        if (i < retries - 1) await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
      }
    }
    return null;
  }
}
