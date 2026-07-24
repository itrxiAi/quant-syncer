import { Logger } from '@nestjs/common';
import axios from 'axios';
import { BarRow } from './types';

const logger = new Logger('FredAdapter');

const BASE_URL = 'https://fred.stlouisfed.org/graph/fredgraph.csv';

/**
 * FRED series used by macro_dashboard.
 * symbol = FRED series ID, stored as BarRow.close.
 */
export const FRED_SERIES: Record<string, string> = {
  NFCI: 'NFCI',
  WEI: 'WEI',
  WMTSECL1: 'WMTSECL1',
  TIPS10Y: 'DFII10',
  UST2Y: 'DGS2',
  UST5Y: 'DGS5',
  UST10Y: 'DGS10',
  UST30Y: 'DGS30',
  VIX: 'VIXCLS',
  DXY: 'DTWEXBGS',
  SP500: 'SP500',
};

export class FredAdapter {
  /**
   * Fetch full history for a FRED series.
   * Returns BarRow[] with close=value, OHLCV null, freq=d1, asset=macro.
   */
  async fetchHistory(symbol: string): Promise<BarRow[]> {
    const seriesId = FRED_SERIES[symbol] ?? symbol;
    const url = `${BASE_URL}?id=${seriesId}`;

    const raw = await this.curlText(url);
    if (!raw) throw new Error(`fetchHistory ${symbol}: failed`);

    return this.parseCsv(raw, symbol);
  }

  /**
   * Fetch incremental: only rows after the last known date.
   */
  async fetchSince(symbol: string, sinceDate: Date): Promise<BarRow[]> {
    const seriesId = FRED_SERIES[symbol] ?? symbol;
    const cosd = sinceDate.toISOString().slice(0, 10);
    const url = `${BASE_URL}?id=${seriesId}&cosd=${cosd}`;

    const raw = await this.curlText(url);
    if (!raw) throw new Error(`fetchSince ${symbol}: failed`);

    return this.parseCsv(raw, symbol);
  }

  private parseCsv(raw: string, symbol: string): BarRow[] {
    const lines = raw.trim().split('\n');
    if (lines.length < 2) return [];

    const header = lines[0].split(',');
    const dateCol = header[0]; // "DATE" or "observation_date"
    const valCol = header[1];

    const rows: BarRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length < 2) continue;
      const dateStr = parts[0];
      const valStr = parts[1].trim();
      if (!valStr || valStr === '.' || valStr === 'NaN') continue;

      const val = parseFloat(valStr);
      if (isNaN(val)) continue;

      // FRED dates are YYYY-MM-DD, treat as UTC midnight
      const ts = new Date(dateStr + 'T00:00:00Z');
      if (isNaN(ts.getTime())) continue;

      rows.push({
        ts,
        symbol,
        open: null,
        high: null,
        low: null,
        close: val,
        volume: null,
        amount: null,
        factor: 1,
        vendor: 'fred',
      });
    }

    return rows;
  }

  private async curlText(url: string, retries = 3): Promise<string | null> {
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
