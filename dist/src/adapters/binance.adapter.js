"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceAdapter = exports.FREQ_MS = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const logger = new common_1.Logger('BinanceAdapter');
const BASE_URL = 'https://fapi.binance.com/fapi/v1';
const MAX_LIMIT = 1500;
const FREQ_MAP = {
    m5: '5m',
    m15: '15m',
    h1: '1h',
    h4: '4h',
    d1: '1d',
};
exports.FREQ_MS = {
    m5: 5 * 60 * 1000,
    m15: 15 * 60 * 1000,
    h1: 60 * 60 * 1000,
    h4: 4 * 60 * 60 * 1000,
    d1: 24 * 60 * 60 * 1000,
};
class BinanceAdapter {
    async fetchRecent(symbol, freq, limit = 600) {
        const interval = FREQ_MAP[freq];
        if (!interval)
            throw new Error(`unsupported freq: ${freq}`);
        const sym = symbol.replace('/', '').toUpperCase();
        const url = `${BASE_URL}/klines?symbol=${sym}&interval=${interval}&limit=${Math.min(limit, MAX_LIMIT)}`;
        const data = await this.curlJson(url);
        if (data === null)
            throw new Error(`fetchRecent ${symbol}@${freq}: all retries failed`);
        if (!Array.isArray(data))
            return [];
        return this.parseKlines(data, symbol, freq);
    }
    async fetchRange(symbol, freq, startMs, endMs) {
        const interval = FREQ_MAP[freq];
        if (!interval)
            throw new Error(`unsupported freq: ${freq}`);
        const sym = symbol.replace('/', '').toUpperCase();
        const end = endMs ?? Date.now();
        const stepMs = exports.FREQ_MS[freq];
        const frames = [];
        let cur = startMs;
        while (cur < end) {
            const url = `${BASE_URL}/klines?symbol=${sym}&interval=${interval}&startTime=${cur}&endTime=${end}&limit=${MAX_LIMIT}`;
            const data = await this.curlJson(url);
            if (data === null)
                throw new Error(`fetchRange ${symbol}@${freq}: all retries failed at ${cur}`);
            if (!Array.isArray(data) || data.length === 0)
                break;
            frames.push(data);
            const lastOpenMs = parseInt(data[data.length - 1][0]);
            if (data.length < MAX_LIMIT || lastOpenMs + stepMs >= end)
                break;
            cur = lastOpenMs + stepMs;
            await new Promise((r) => setTimeout(r, 250));
        }
        const all = frames.flat();
        return this.parseKlines(all, symbol, freq);
    }
    parseKlines(data, symbol, freq) {
        const stepMs = exports.FREQ_MS[freq];
        const now = Date.now();
        const rows = [];
        for (const k of data) {
            const openTime = parseInt(k[0]);
            if (openTime + stepMs > now)
                continue;
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
        const seen = new Map();
        for (const r of rows) {
            seen.set(r.ts.getTime(), r);
        }
        return Array.from(seen.values()).sort((a, b) => a.ts.getTime() - b.ts.getTime());
    }
    async curlJson(url, retries = 5) {
        for (let i = 0; i < retries; i++) {
            try {
                const res = await axios_1.default.get(url, { timeout: 15000 });
                return res.data;
            }
            catch (e) {
                logger.warn(`curl attempt ${i + 1}/${retries} failed: ${e}`);
                if (i < retries - 1)
                    await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
            }
        }
        return null;
    }
}
exports.BinanceAdapter = BinanceAdapter;
//# sourceMappingURL=binance.adapter.js.map