"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkshareAdapter = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const logger = new common_1.Logger('SinaAdapter');
const SINA_HQ_URL = 'https://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData';
const SINA_KLINE_URL = 'https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData';
const SINA_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://finance.sina.com.cn',
};
const SINA_INDEX_NODES = {
    '000300': 'hs300',
    '000905': 'zhishu_000905',
};
function isRealAShare(code) {
    if (!code || code.length < 8)
        return false;
    const market = code.slice(0, 2);
    const num = code.slice(2);
    if (market === 'SH')
        return num.startsWith('60') || num.startsWith('68');
    if (market === 'SZ')
        return num.startsWith('00') || num.startsWith('30');
    return false;
}
class AkshareAdapter {
    async fetchSpot() {
        const bars = [];
        const ts = new Date();
        ts.setHours(0, 0, 0, 0);
        const PAGE_SIZE = 100;
        for (let page = 1; page <= 60; page++) {
            const res = await axios_1.default.get(SINA_HQ_URL, {
                params: { page, num: PAGE_SIZE, sort: 'symbol', asc: 1, node: 'hs_a', _s_r_a: 'auto' },
                headers: SINA_HEADERS,
                timeout: 15000,
            });
            const rows = res.data;
            if (!Array.isArray(rows) || rows.length === 0)
                break;
            for (const row of rows) {
                const sym = String(row.symbol ?? '');
                if (!isRealAShare(sym.toUpperCase()))
                    continue;
                const trade = Number(row.trade);
                if (!trade || trade === 0)
                    continue;
                bars.push({
                    ts: new Date(ts),
                    symbol: sym.toUpperCase(),
                    open: Number(row.open) || null,
                    high: Number(row.high) || null,
                    low: Number(row.low) || null,
                    close: trade,
                    volume: Number(row.volume) || null,
                    amount: null,
                    factor: 1,
                    vendor: 'sina_spot',
                });
            }
            if (rows.length < PAGE_SIZE)
                break;
        }
        if (bars.length === 0) {
            throw new Error('fetchSpot: no data from sina');
        }
        logger.log(`fetchSpot: ${bars.length} A-shares from sina`);
        return { bars, vendor: 'sina_spot' };
    }
    async fetchHistory(qlibSym, start, end) {
        const symbol = qlibSym.toLowerCase();
        try {
            const res = await axios_1.default.get(SINA_KLINE_URL, {
                params: { symbol, scale: 240, ma: 'no', datalen: 10000 },
                headers: SINA_HEADERS,
                timeout: 15000,
            });
            const rows = res.data;
            if (!Array.isArray(rows))
                return { bars: [], vendor: 'sina_hist' };
            let bars = rows.map((row) => ({
                ts: new Date(row.day),
                symbol: qlibSym,
                open: parseFloat(row.open),
                high: parseFloat(row.high),
                low: parseFloat(row.low),
                close: parseFloat(row.close),
                volume: parseFloat(row.volume),
                amount: null,
                factor: 1,
                vendor: 'sina_hist',
            }));
            if (start) {
                const s = new Date(start);
                bars = bars.filter(b => b.ts >= s);
            }
            if (end) {
                const e = new Date(end);
                bars = bars.filter(b => b.ts <= e);
            }
            return { bars, vendor: 'sina_hist' };
        }
        catch (e) {
            logger.warn(`fetchHistory ${qlibSym} failed: ${e}`);
            return { bars: [], vendor: 'sina_hist' };
        }
    }
    async fetchIndexHistory(qlibSym, start, end) {
        return this.fetchHistory(qlibSym, start, end);
    }
    async fetchTradeCalendar() {
        try {
            const res = await axios_1.default.get(SINA_KLINE_URL, {
                params: { symbol: 'sh000001', scale: 240, ma: 'no', datalen: 10000 },
                headers: SINA_HEADERS,
                timeout: 15000,
            });
            const rows = res.data;
            if (!Array.isArray(rows))
                throw new Error('no calendar data');
            return rows.map((row) => ({ date: row.day, isOpen: true }));
        }
        catch (e) {
            logger.warn(`fetchTradeCalendar failed: ${e}`);
            throw e;
        }
    }
    async fetchIndexConstituents(indexSymbol) {
        const node = SINA_INDEX_NODES[indexSymbol];
        if (!node) {
            logger.warn(`fetchIndexConstituents: unknown index ${indexSymbol}`);
            return [];
        }
        try {
            const constituents = [];
            const PAGE_SIZE = 100;
            for (let page = 1; page <= 20; page++) {
                const res = await axios_1.default.get(SINA_HQ_URL, {
                    params: { page, num: PAGE_SIZE, sort: 'symbol', asc: 1, node, _s_r_a: 'auto' },
                    headers: SINA_HEADERS,
                    timeout: 15000,
                });
                const rows = res.data;
                if (!Array.isArray(rows) || rows.length === 0)
                    break;
                const today = new Date().toISOString().slice(0, 10);
                for (const row of rows) {
                    const sym = String(row.symbol ?? '').toUpperCase();
                    if (isRealAShare(sym)) {
                        constituents.push({ symbol: sym, inDate: today });
                    }
                }
                if (rows.length < PAGE_SIZE)
                    break;
            }
            logger.log(`fetchIndexConstituents ${indexSymbol}: ${constituents.length} stocks`);
            return constituents;
        }
        catch (e) {
            logger.warn(`fetchIndexConstituents ${indexSymbol} failed: ${e}`);
            return [];
        }
    }
}
exports.AkshareAdapter = AkshareAdapter;
//# sourceMappingURL=akshare.adapter.js.map