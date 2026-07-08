"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkshareAdapter = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const logger = new common_1.Logger('EastmoneyAdapter');
const KLINE_URL = 'https://push2his.eastmoney.com/api/qt/stock/kline/get';
const SPOT_URL = 'https://push2.eastmoney.com/api/qt/clist/get';
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
        const params = {
            fs: 'm:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048',
            fields: 'f12,f14,f2,f3,f4,f5,f6,f7,f8,f15,f16,f17,f18',
            pn: 1,
            pz: 10000,
            fid: 'f3',
            po: 1,
        };
        const res = await axios_1.default.get(SPOT_URL, { params, timeout: 15000 });
        const data = res.data?.data?.diff;
        if (!data || !Array.isArray(data)) {
            throw new Error('fetchSpot: no data from eastmoney');
        }
        const ts = new Date();
        ts.setHours(0, 0, 0, 0);
        const bars = [];
        for (const row of data) {
            const code = String(row.f12 ?? '');
            const market = code.startsWith('6') || code.startsWith('8') ? 1 : 0;
            const qsym = toQlibSymbol(code, market);
            if (!isRealAShare(qsym))
                continue;
            bars.push({
                ts: new Date(ts),
                symbol: qsym,
                open: row.f17 ? Number(row.f17) : null,
                high: row.f15 ? Number(row.f15) : null,
                low: row.f16 ? Number(row.f16) : null,
                close: row.f2 ? Number(row.f2) : null,
                volume: row.f5 ? Number(row.f5) : null,
                amount: row.f6 ? Number(row.f6) : null,
                factor: 1,
                vendor: 'em_spot',
            });
        }
        return { bars, vendor: 'em_spot' };
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
            const res = await axios_1.default.get(KLINE_URL, { params, timeout: 15000 });
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
            const res = await axios_1.default.get(KLINE_URL, { params, timeout: 15000 });
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
        const indexMap = {
            '000300': 'b:BK0500',
            '000905': 'b:BK0800',
            '000852': 'b:BK1050',
        };
        const fs = indexMap[indexSymbol] || `b:${indexSymbol}`;
        try {
            const res = await axios_1.default.get(SPOT_URL, {
                params: {
                    fs,
                    fields: 'f12,f14',
                    pn: 1,
                    pz: 5000,
                    fid: 'f3',
                    po: 1,
                },
                timeout: 15000,
            });
            const data = res.data?.data?.diff;
            if (!data || !Array.isArray(data)) {
                return [];
            }
            const today = new Date().toISOString().slice(0, 10);
            return data
                .map((row) => {
                const code = String(row.f12 ?? '');
                const market = code.startsWith('6') || code.startsWith('8') ? 1 : 0;
                const qsym = toQlibSymbol(code, market);
                return { symbol: qsym, inDate: today };
            })
                .filter((c) => isRealAShare(c.symbol));
        }
        catch (e) {
            logger.warn(`fetchIndexConstituents ${indexSymbol} failed: ${e}`);
            return [];
        }
    }
}
exports.AkshareAdapter = AkshareAdapter;
//# sourceMappingURL=akshare.adapter.js.map