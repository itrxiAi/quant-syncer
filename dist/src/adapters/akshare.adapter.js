"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkshareAdapter = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const logger = new common_1.Logger('MarketDataAdapter');
const KLINE_URL = 'https://push2his.eastmoney.com/api/qt/stock/kline/get';
const SINA_HQ_URL = 'https://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData';
const EM_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://quote.eastmoney.com',
};
const SINA_INDEX_NODES = {
    '000300': 'hs300',
    '000905': 'hs500',
    '000852': 'hs1000',
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
function toQlibSymbol(code, market) {
    const padded = code.padStart(6, '0');
    if (market === 1)
        return 'SH' + padded;
    return 'SZ' + padded;
}
function toSecid(qlibSym) {
    const market = qlibSym.startsWith('SH') ? 1 : 0;
    const code = qlibSym.slice(2);
    return `${market}.${code}`;
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
                    amount: Number(row.amount) || null,
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
        const secid = toSecid(qlibSym);
        const beg = start ? start.replace(/-/g, '').slice(0, 8) : '19900101';
        const endStr = end ? end.replace(/-/g, '').slice(0, 8) : '20991231';
        const params = {
            secid,
            klt: 101,
            fqt: 0,
            beg,
            end: endStr,
            fields1: 'f1,f2,f3,f4,f5,f6',
            fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
            lmt: -1,
        };
        try {
            const res = await axios_1.default.get(KLINE_URL, { params, headers: EM_HEADERS, timeout: 15000 });
            const klines = res.data?.data?.klines;
            if (!klines || !Array.isArray(klines)) {
                return { bars: [], vendor: 'em_hist' };
            }
            const bars = klines.map((line) => {
                const parts = line.split(',');
                return {
                    ts: new Date(parts[0]),
                    symbol: qlibSym,
                    open: parseFloat(parts[1]),
                    close: parseFloat(parts[2]),
                    high: parseFloat(parts[3]),
                    low: parseFloat(parts[4]),
                    volume: parseFloat(parts[5]),
                    amount: parseFloat(parts[6]),
                    factor: 1,
                    vendor: 'em_hist',
                };
            });
            return { bars, vendor: 'em_hist' };
        }
        catch (e) {
            logger.warn(`fetchHistory ${qlibSym} failed: ${e}`);
            return { bars: [], vendor: 'em_hist' };
        }
    }
    async fetchIndexHistory(qlibSym, start, end) {
        const secid = toSecid(qlibSym);
        const beg = start ? start.replace(/-/g, '').slice(0, 8) : '19900101';
        const endStr = end ? end.replace(/-/g, '').slice(0, 8) : '20991231';
        const params = {
            secid,
            klt: 101,
            fqt: 0,
            beg,
            end: endStr,
            fields1: 'f1,f2,f3,f4,f5,f6',
            fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
            lmt: -1,
        };
        try {
            const res = await axios_1.default.get(KLINE_URL, { params, headers: EM_HEADERS, timeout: 15000 });
            const klines = res.data?.data?.klines;
            if (!klines || !Array.isArray(klines)) {
                return { bars: [], vendor: 'em_index' };
            }
            const bars = klines.map((line) => {
                const parts = line.split(',');
                return {
                    ts: new Date(parts[0]),
                    symbol: qlibSym,
                    open: parseFloat(parts[1]),
                    close: parseFloat(parts[2]),
                    high: parseFloat(parts[3]),
                    low: parseFloat(parts[4]),
                    volume: parseFloat(parts[5]),
                    amount: parseFloat(parts[6]),
                    factor: 1,
                    vendor: 'em_index',
                };
            });
            return { bars, vendor: 'em_index' };
        }
        catch (e) {
            logger.warn(`fetchIndexHistory ${qlibSym} failed: ${e}`);
            return { bars: [], vendor: 'em_index' };
        }
    }
    async fetchTradeCalendar() {
        try {
            const res = await axios_1.default.get(KLINE_URL, {
                params: {
                    secid: '1.000001',
                    klt: 101,
                    fqt: 0,
                    beg: '20100101',
                    end: '20991231',
                    fields1: 'f1,f2,f3,f4,f5,f6',
                    fields2: 'f51',
                    lmt: -1,
                },
                headers: EM_HEADERS,
                timeout: 15000,
            });
            const klines = res.data?.data?.klines;
            if (!klines || !Array.isArray(klines)) {
                throw new Error('no calendar data');
            }
            return klines.map((line) => ({
                date: line.split(',')[0],
                isOpen: true,
            }));
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