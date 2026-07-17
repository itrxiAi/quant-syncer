"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BarsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const BATCH_SIZE = 500;
const MAX_ROWS = 200000;
const MAX_RANGE_DAYS_BY_FREQ = {
    d1: 10950,
    h4: 3650,
    h1: 2190,
    m15: 1095,
    m5: 548,
};
let BarsService = BarsService_1 = class BarsService {
    prisma;
    logger = new common_1.Logger(BarsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findBars(params) {
        const where = {
            asset: params.asset,
            freq: params.freq,
        };
        let multiSymbol = false;
        if (params.symbol) {
            where.symbol = params.symbol;
        }
        else if (params.symbols && params.symbols.length > 0) {
            where.symbol = { in: params.symbols };
            multiSymbol = params.symbols.length > 1;
        }
        else if (params.index) {
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
            throw new common_1.BadRequestException('start and/or end date range is required when querying multiple symbols or an index');
        }
        if (params.start || params.end) {
            where.ts = {};
            if (params.start)
                where.ts.gte = new Date(params.start);
            if (params.end)
                where.ts.lte = new Date(params.end);
            if (params.start && params.end) {
                const days = (new Date(params.end).getTime() - new Date(params.start).getTime()) / 86400000;
                const maxDays = MAX_RANGE_DAYS_BY_FREQ[params.freq] ?? 365;
                if (days > maxDays) {
                    throw new common_1.BadRequestException(`date range too large for freq=${params.freq} (max ${maxDays} days)`);
                }
            }
        }
        const select = {};
        if (params.fields && params.fields.length > 0) {
            select.ts = true;
            select.symbol = true;
            for (const f of params.fields) {
                if (['open', 'high', 'low', 'close', 'volume', 'amount', 'factor', 'takerBuyBaseVolume', 'vendor'].includes(f)) {
                    select[f] = true;
                }
            }
        }
        const t0 = Date.now();
        const result = await this.prisma.bar.findMany({
            where,
            orderBy: [{ symbol: 'asc' }, { ts: 'asc' }],
            take: MAX_ROWS,
            ...(Object.keys(select).length > 0 ? { select } : {}),
        });
        const t1 = Date.now();
        let rawMs = null;
        if (params.symbols && params.symbols.length > 1 && params.start && params.end) {
            const syms = params.symbols;
            const placeholders = syms.map((_, i) => `$${i + 1}`).join(',');
            const rawVals = [...syms, new Date(params.start), new Date(params.end)];
            const rawSql = `SELECT ts, symbol, open, high, low, close, volume, amount, factor FROM bar WHERE asset = 'ashare' AND freq = 'd1' AND symbol IN (${placeholders}) AND ts >= $${syms.length + 1} AND ts <= $${syms.length + 2} ORDER BY symbol, ts LIMIT ${MAX_ROWS}`;
            const tRaw0 = Date.now();
            const rawResult = await this.prisma.$queryRawUnsafe(rawSql, ...rawVals);
            const tRaw1 = Date.now();
            rawMs = tRaw1 - tRaw0;
        }
        this.logger.log(`findBars: prisma.findMany ${t1 - t0}ms, rows=${result.length}, symbols=${params.symbols?.length ?? 1}${rawMs !== null ? `, rawSQL ${rawMs}ms` : ''}`);
        return result;
    }
    async batchUpsert(asset, freq, bars) {
        let count = 0;
        for (let i = 0; i < bars.length; i += BATCH_SIZE) {
            const batch = bars.slice(i, i + BATCH_SIZE);
            const placeholders = batch.map((_, idx) => {
                const off = idx * 13;
                return `($${off + 1}, $${off + 2}, $${off + 3}::"Asset", $${off + 4}::"Freq", $${off + 5}, $${off + 6}, $${off + 7}, $${off + 8}, $${off + 9}, $${off + 10}, $${off + 11}, $${off + 12}, $${off + 13})`;
            }).join(', ');
            const params = [];
            for (const b of batch) {
                params.push(b.ts, b.symbol, asset, freq, b.open, b.high, b.low, b.close, b.volume, b.amount, b.factor ?? 1, b.takerBuyBaseVolume ?? null, b.vendor);
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
    async latestTs(asset, symbol, freq) {
        const row = await this.prisma.bar.findFirst({
            where: { asset, symbol, freq },
            orderBy: { ts: 'desc' },
            select: { ts: true },
        });
        return row?.ts ?? null;
    }
    allSymbolsIndexCode(asset) {
        return asset === client_1.Asset.ashare ? 'all_ashare' : 'all_crypto';
    }
    async ensureSymbolsRegistered(asset, symbols) {
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
            if (existingSet.has(sym))
                continue;
            await this.prisma.indexMember.upsert({
                where: { indexCode_symbol_inDate: { indexCode, symbol: sym, inDate: today } },
                create: { indexCode, symbol: sym, inDate: today },
                update: {},
            });
            added++;
        }
        return { total: symbols.length, added };
    }
    async listSymbols(asset, freq) {
        if (asset === client_1.Asset.ashare) {
            const rows = await this.prisma.indexMember.findMany({
                where: { indexCode: this.allSymbolsIndexCode(asset) },
                select: { symbol: true },
                distinct: ['symbol'],
                orderBy: { symbol: 'asc' },
            });
            return rows.map((r) => r.symbol);
        }
        const rows = await this.prisma.$queryRawUnsafe(`SELECT DISTINCT symbol FROM "bar" WHERE asset = $1::"Asset" AND freq = $2::"Freq" ORDER BY symbol`, asset, freq);
        return rows.map((r) => r.symbol);
    }
    async listLatest(asset, freq) {
        const indexCode = this.allSymbolsIndexCode(asset);
        const rows = await this.prisma.$queryRawUnsafe(`SELECT m.symbol, b.ts
       FROM "index_member" m
       LEFT JOIN LATERAL (
         SELECT ts FROM "bar"
         WHERE symbol = m.symbol AND asset = $1::"Asset" AND freq = $2::"Freq"
           AND ts >= date_trunc('year', NOW()) - INTERVAL '1 month'
         ORDER BY ts DESC LIMIT 1
       ) b ON true
       WHERE m.index_code = $3`, asset, freq, indexCode);
        const result = {};
        for (const r of rows) {
            result[r.symbol] = r.ts ? new Date(r.ts).toISOString() : null;
        }
        return result;
    }
};
exports.BarsService = BarsService;
exports.BarsService = BarsService = BarsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BarsService);
//# sourceMappingURL=bars.service.js.map