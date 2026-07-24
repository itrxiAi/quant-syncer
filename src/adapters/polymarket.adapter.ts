import { Logger } from '@nestjs/common';
import axios from 'axios';

const logger = new Logger('PolymarketAdapter');

const BASE_URL = 'https://gamma-api.polymarket.com';

export interface PolymarketMarket {
  id: string;
  question: string;
  slug: string;
  yesProb: number | null;
  vol24h: number | null;
  volTotal: number | null;
  endDate: Date | null;
  active: boolean;
}

export class PolymarketAdapter {
  /**
   * Fetch active prediction markets.
   * Returns markets sorted by 24h volume (desc).
   */
  async fetchActive(limit = 200): Promise<PolymarketMarket[]> {
    const markets: PolymarketMarket[] = [];
    let offset = 0;
    const pageSize = Math.min(limit, 100);

    while (markets.length < limit) {
      const url = `${BASE_URL}/markets?limit=${pageSize}&offset=${offset}&active=true&closed=false&order=volume24hr&ascending=false`;
      const data = await this.curlJson(url);
      if (!data || !Array.isArray(data) || data.length === 0) break;

      for (const m of data) {
        if (markets.length >= limit) break;
        markets.push(this.parseMarket(m));
      }

      if (data.length < pageSize) break;
      offset += pageSize;
      await new Promise((r) => setTimeout(r, 200));
    }

    return markets;
  }

  private parseMarket(m: any): PolymarketMarket {
    // Polymarket gamma API: yesProb may be in outcomes or in bestBid
    let yesProb: number | null = null;
    if (m.outcomePrices && Array.isArray(m.outcomePrices) && m.outcomePrices.length > 0) {
      yesProb = parseFloat(m.outcomePrices[0]);
    } else if (m.bestBid !== undefined && m.bestBid !== null) {
      yesProb = parseFloat(m.bestBid);
    }

    return {
      id: String(m.id),
      question: m.question ?? '',
      slug: m.slug ?? '',
      yesProb: isNaN(yesProb as number) ? null : yesProb,
      vol24h: m.volume24hr ? parseFloat(m.volume24hr) : (m.liquidity ? parseFloat(m.liquidity) : null),
      volTotal: m.volumeNum ? parseFloat(m.volumeNum) : (m.volume ? parseFloat(m.volume) : null),
      endDate: m.endDate ? new Date(m.endDate) : null,
      active: m.active !== false,
    };
  }

  private async curlJson(url: string, retries = 3): Promise<any> {
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
