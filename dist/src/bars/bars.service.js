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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const BATCH_SIZE = 500;
let BarsService = class BarsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findBars(params) {
        const where = {
            asset: params.asset,
            freq: params.freq,
        };
        if (params.symbol) {
            where.symbol = params.symbol;
        }
        else if (params.symbols && params.symbols.length > 0) {
            where.symbol = { in: params.symbols };
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
        }
        if (params.start || params.end) {
            where.ts = {};
            if (params.start)
                where.ts.gte = new Date(params.start);
            if (params.end)
                where.ts.lte = new Date(params.end);
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
        return this.prisma.bar.findMany({
            where,
            orderBy: [{ symbol: 'asc' }, { ts: 'asc' }],
            ...(Object.keys(select).length > 0 ? { select } : {}),
        });
    }
    async batchUpsert(asset, freq, bars) {
        let count = 0;
        for (let i = 0; i < bars.length; i += BATCH_SIZE) {
            const batch = bars.slice(i, i + BATCH_SIZE);
            const placeholders = batch.map((_, idx) => {
                const off = idx * 12;
                return `($${off + 1}, $${off + 2}, $${off + 3}::"Asset", $${off + 4}::"Freq", $${off + 5}, $${off + 6}, $${off + 7}, $${off + 8}, $${off + 9}, $${off + 10}, $${off + 11}, $${off + 12})`;
            }).join(', ');
            const params = [];
            for (const b of batch) {
                params.push(b.ts, b.symbol, asset, freq, b.open, b.high, b.low, b.close, b.volume, b.amount, b.factor ?? 1, b.vendor);
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
    async latestTs(asset, symbol, freq) {
        const row = await this.prisma.bar.findFirst({
            where: { asset, symbol, freq },
            orderBy: { ts: 'desc' },
            select: { ts: true },
        });
        return row?.ts ?? null;
    }
    async listSymbols(asset, freq) {
        const rows = await this.prisma.bar.findMany({
            where: { asset, freq },
            distinct: ['symbol'],
            select: { symbol: true },
        });
        return rows.map((r) => r.symbol).sort();
    }
    async listLatest(asset, freq) {
        const symbols = await this.listSymbols(asset, freq);
        const result = {};
        for (const sym of symbols) {
            const ts = await this.latestTs(asset, sym, freq);
            result[sym] = ts ? ts.toISOString() : null;
        }
        return result;
    }
};
exports.BarsService = BarsService;
exports.BarsService = BarsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BarsService);
//# sourceMappingURL=bars.service.js.map