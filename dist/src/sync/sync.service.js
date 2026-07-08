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
var SyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const admin_service_1 = require("../admin/admin.service");
const akshare_adapter_1 = require("../adapters/akshare.adapter");
const binance_adapter_1 = require("../adapters/binance.adapter");
const bars_service_1 = require("../bars/bars.service");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const CRYPTO_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'DOGEUSDT'];
const CRYPTO_FREQS = ['m5', 'm15', 'h1', 'h4', 'd1'];
let SyncService = SyncService_1 = class SyncService {
    adminService;
    akshare;
    binance;
    barsService;
    prisma;
    logger = new common_1.Logger(SyncService_1.name);
    ashareSyncing = false;
    cryptoSyncing = false;
    constructor(adminService, akshare, binance, barsService, prisma) {
        this.adminService = adminService;
        this.akshare = akshare;
        this.binance = binance;
        this.barsService = barsService;
        this.prisma = prisma;
    }
    async syncAShareSpot() {
        this.logger.log('syncing ashare spot...');
        const { bars, vendor } = await this.akshare.fetchSpot();
        this.logger.log(`fetchSpot: ${bars.length} symbols from ${vendor}`);
        const totalRows = await this.barsService.batchUpsert(client_1.Asset.ashare, client_1.Freq.d1, bars);
        this.logger.log(`syncAShareSpot done: ${totalRows} rows`);
        return { symbols: bars.length, rows: totalRows, vendor };
    }
    async manualSyncAShare() {
        if (this.ashareSyncing)
            return { skipped: true, reason: 'ashare sync already running' };
        this.ashareSyncing = true;
        try {
            await this.syncCalendar();
            await this.catchUpAshare();
            await this.syncAShareSpot();
            return { skipped: false };
        }
        catch (e) {
            this.logger.error(`manual ashare sync failed: ${e}`);
            return { skipped: false, error: String(e) };
        }
        finally {
            this.ashareSyncing = false;
        }
    }
    async manualSyncCrypto() {
        if (this.cryptoSyncing)
            return { skipped: true, reason: 'crypto sync already running' };
        this.cryptoSyncing = true;
        try {
            return await this.syncCrypto(CRYPTO_SYMBOLS, CRYPTO_FREQS);
        }
        catch (e) {
            this.logger.error(`manual crypto sync failed: ${e}`);
            return { error: String(e) };
        }
        finally {
            this.cryptoSyncing = false;
        }
    }
    async manualSyncCalendar() {
        return await this.syncCalendar();
    }
    async syncCrypto(symbols, freqs) {
        const result = {};
        for (const sym of symbols) {
            for (const freq of freqs) {
                const key = `${sym}@${freq}`;
                try {
                    const latest = await this.barsService.latestTs(client_1.Asset.crypto, sym, freq);
                    let bars;
                    if (latest === null) {
                        bars = await this.binance.fetchRecent(sym, freq, 600);
                    }
                    else {
                        const stepMs = binance_adapter_1.FREQ_MS[freq];
                        bars = await this.binance.fetchRange(sym, freq, latest.getTime() + stepMs);
                    }
                    if (bars.length > 0) {
                        await this.barsService.batchUpsert(client_1.Asset.crypto, freq, bars);
                        result[key] = bars.length;
                    }
                    else {
                        result[key] = 0;
                    }
                }
                catch (e) {
                    this.logger.warn(`${key} failed: ${e}`);
                    result[key] = -1;
                }
            }
        }
        return result;
    }
    async syncCalendar() {
        const days = await this.akshare.fetchTradeCalendar();
        let count = 0;
        for (const d of days) {
            await this.prisma.calendar.upsert({
                where: { date: new Date(d.date) },
                create: { date: new Date(d.date), isOpen: d.isOpen, asset: client_1.Asset.ashare },
                update: { isOpen: d.isOpen },
            });
            count++;
        }
        this.logger.log(`syncCalendar: ${count} days`);
        return { days: count };
    }
    async catchUpAshare() {
        const { bars: spotBars } = await this.akshare.fetchSpot();
        const universe = spotBars.map((b) => b.symbol);
        const existingSymbols = await this.barsService.listSymbols(client_1.Asset.ashare, client_1.Freq.d1);
        const allSymbols = Array.from(new Set([...universe, ...existingSymbols]));
        const lastTradingDay = await this.getLastCompletedTradingDay();
        let checked = 0;
        let healed = 0;
        let healedRows = 0;
        const errors = [];
        for (const sym of allSymbols) {
            checked++;
            if (checked % 500 === 0)
                this.logger.log(`catchUpAshare: checked ${checked}/${allSymbols.length}`);
            const latest = await this.barsService.latestTs(client_1.Asset.ashare, sym, client_1.Freq.d1);
            if (latest !== null && lastTradingDay !== null && latest >= lastTradingDay) {
                continue;
            }
            try {
                const { bars } = await this.akshare.fetchHistory(sym, latest ? this.addDays(latest, 1).toISOString() : undefined);
                if (bars.length > 0) {
                    await this.barsService.batchUpsert(client_1.Asset.ashare, client_1.Freq.d1, bars);
                    healed++;
                    healedRows += bars.length;
                }
            }
            catch (e) {
                errors.push(`${sym}: ${e}`);
            }
            await new Promise((r) => setTimeout(r, 200));
        }
        this.logger.log(`catchUpAshare: ${checked} checked, ${healed} healed, ${healedRows} rows, ${errors.length} errors`);
        return { checked, healed, healedRows, errors: errors.slice(0, 20) };
    }
    addDays(d, n) {
        const out = new Date(d);
        out.setDate(out.getDate() + n);
        return out;
    }
    async getLastCompletedTradingDay() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const row = await this.prisma.calendar.findFirst({
            where: { asset: client_1.Asset.ashare, isOpen: true, date: { lte: today } },
            orderBy: { date: 'desc' },
        });
        return row?.date ?? null;
    }
    async syncAShareDaily() {
        if (this.ashareSyncing) {
            this.logger.warn('ashare sync already running, skip');
            return;
        }
        this.ashareSyncing = true;
        try {
            this.logger.log('=== ashare daily sync start ===');
            await this.syncCalendar();
            await this.catchUpAshare();
            await this.syncAShareSpot();
            this.logger.log('=== ashare daily sync done ===');
        }
        catch (e) {
            this.logger.error(`ashare sync failed: ${e}`);
        }
        finally {
            this.ashareSyncing = false;
        }
    }
    async syncCryptoContinuous() {
        if (this.cryptoSyncing) {
            this.logger.warn('crypto sync already running, skip');
            return;
        }
        this.cryptoSyncing = true;
        try {
            await this.syncCrypto(CRYPTO_SYMBOLS, CRYPTO_FREQS);
        }
        catch (e) {
            this.logger.error(`crypto sync failed: ${e}`);
        }
        finally {
            this.cryptoSyncing = false;
        }
    }
    async syncIndexMonthly() {
        if (this.ashareSyncing) {
            this.logger.warn('ashare sync running, skip index sync');
            return;
        }
        this.ashareSyncing = true;
        try {
            this.logger.log('=== index monthly sync start ===');
            await this.adminService.syncIndex('csi300', '000300', '沪深300');
            await this.adminService.syncIndex('csi500', '000905', '中证500');
            await this.adminService.syncIndex('csi1000', '000852', '中证1000');
            this.logger.log('=== index monthly sync done ===');
        }
        catch (e) {
            this.logger.error(`index sync failed: ${e}`);
        }
        finally {
            this.ashareSyncing = false;
        }
    }
    async runOnce(asset) {
        if (asset === 'ashare') {
            await this.syncCalendar();
            await this.catchUpAshare();
            await this.syncAShareSpot();
        }
        else if (asset === 'crypto') {
            await this.syncCrypto(CRYPTO_SYMBOLS, CRYPTO_FREQS);
        }
    }
};
exports.SyncService = SyncService;
__decorate([
    (0, schedule_1.Cron)('30 18 * * 1-5'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncService.prototype, "syncAShareDaily", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncService.prototype, "syncCryptoContinuous", null);
__decorate([
    (0, schedule_1.Cron)('0 10 1 * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SyncService.prototype, "syncIndexMonthly", null);
exports.SyncService = SyncService = SyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        akshare_adapter_1.AkshareAdapter,
        binance_adapter_1.BinanceAdapter,
        bars_service_1.BarsService,
        prisma_service_1.PrismaService])
], SyncService);
//# sourceMappingURL=sync.service.js.map