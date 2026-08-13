import { Logger } from '@nestjs/common';
import axios from 'axios';
import { BarRow } from './types';

const logger = new Logger('FrankfurterAdapter');

const BASE_URL = 'https://api.frankfurter.dev/v1';

/**
 * ICE U.S. Dollar Index (DXY) formula:
 *   DXY = 50.14348112 × EURUSD^(-0.576) × USDJPY^(0.136) × GBPUSD^(-0.119)
 *         × USDCAD^(0.091) × USDSEK^(0.042) × USDCHF^(0.036)
 *
 * Rates are fetched from Frankfurter (ECB reference rates), no API key required.
 * History available from 1999-01-04 (EUR inception).
 */

// [base, quote, exponent] — exponent from ICE DXY formula
const DXY_COMPONENTS: [string, string, number][] = [
  ['EUR', 'USD', -0.576],
  ['USD', 'JPY', 0.136],
  ['GBP', 'USD', -0.119],
  ['USD', 'CAD', 0.091],
  ['USD', 'SEK', 0.042],
  ['USD', 'CHF', 0.036],
];

const DXY_COEFF = 50.14348112;

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export class FrankfurterAdapter {
  /**
   * Fetch ICE DXY history for a date range, computed from 6 ECB currency pairs.
   */
  async fetchDxyHistory(startDate: Date, endDate: Date): Promise<BarRow[]> {
    return this.fetchDxyRange(startDate, endDate);
  }

  /**
   * Fetch incremental: DXY rows from startDate to today.
   */
  async fetchDxySince(startDate: Date): Promise<BarRow[]> {
    return this.fetchDxyRange(startDate, new Date());
  }

  private async fetchDxyRange(startDate: Date, endDate: Date): Promise<BarRow[]> {
    const start = fmtDate(startDate);
    const end = fmtDate(endDate);

    // Fetch all 6 currency pairs in parallel
    const pairResults = await Promise.all(
      DXY_COMPONENTS.map(async ([base, quote]) => {
        const rates = await this.fetchTimeSeries(base, quote, start, end);
        return { base, quote, rates };
      }),
    );

    // Merge into a single date -> {pairName: rate} map
    const dateMap = new Map<string, Map<string, number>>();
    for (const { base, quote, rates } of pairResults) {
      const pairName = `${base}${quote}`;
      for (const [date, rate] of Object.entries(rates)) {
        if (!dateMap.has(date)) dateMap.set(date, new Map());
        dateMap.get(date)!.set(pairName, rate);
      }
    }

    // Compute DXY for each date that has all 6 pairs
    const rows: BarRow[] = [];
    const sortedDates = [...dateMap.keys()].sort();
    for (const date of sortedDates) {
      const pairs = dateMap.get(date)!;
      if (pairs.size < 6) continue; // skip incomplete dates

      let dxy = DXY_COEFF;
      const pairRates = [
        pairs.get('EURUSD'),
        pairs.get('USDJPY'),
        pairs.get('GBPUSD'),
        pairs.get('USDCAD'),
        pairs.get('USDSEK'),
        pairs.get('USDCHF'),
      ];
      if (pairRates.some((r) => r === undefined || r === null)) continue;

      for (let i = 0; i < DXY_COMPONENTS.length; i++) {
        dxy *= Math.pow(pairRates[i]!, DXY_COMPONENTS[i][2]);
      }

      const ts = new Date(date + 'T00:00:00Z');
      if (isNaN(ts.getTime())) continue;

      rows.push({
        ts,
        symbol: 'DXY',
        open: null,
        high: null,
        low: null,
        close: dxy,
        volume: null,
        amount: null,
        factor: 1,
        vendor: 'frankfurter',
      });
    }

    return rows;
  }

  private async fetchTimeSeries(
    base: string,
    quote: string,
    start: string,
    end: string,
  ): Promise<Record<string, number>> {
    const url = `${BASE_URL}/${start}..${end}`;
    const params = { from: base, to: quote };

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await axios.get(url, { params, timeout: 15000 });
        const rates = res.data?.rates ?? {};
        const out: Record<string, number> = {};
        for (const [date, val] of Object.entries(rates)) {
          const rate = (val as Record<string, number>)[quote];
          if (rate !== undefined && !isNaN(rate)) out[date] = rate;
        }
        return out;
      } catch (e) {
        logger.warn(`fetchTimeSeries ${base}/${quote} attempt ${attempt + 1}/3 failed: ${e}`);
        if (attempt < 2) await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    }
    throw new Error(`fetchTimeSeries ${base}/${quote} exhausted retries`);
  }
}
