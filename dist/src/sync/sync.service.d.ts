import { AdminService } from '../admin/admin.service';
import { AkshareAdapter } from '../adapters/akshare.adapter';
import { BinanceAdapter } from '../adapters/binance.adapter';
import { BarsService } from '../bars/bars.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class SyncService {
    private adminService;
    private akshare;
    private binance;
    private barsService;
    private prisma;
    private readonly logger;
    private ashareSyncing;
    private cryptoSyncing;
    constructor(adminService: AdminService, akshare: AkshareAdapter, binance: BinanceAdapter, barsService: BarsService, prisma: PrismaService);
    syncAShareSpot(): Promise<{
        symbols: number;
        rows: number;
        vendor: string;
    }>;
    manualSyncAShare(): Promise<{
        skipped: boolean;
        reason: string;
        error?: undefined;
    } | {
        skipped: boolean;
        reason?: undefined;
        error?: undefined;
    } | {
        skipped: boolean;
        error: string;
        reason?: undefined;
    }>;
    manualSyncCrypto(): Promise<Record<string, number> | {
        skipped: boolean;
        reason: string;
        error?: undefined;
    } | {
        error: string;
        skipped?: undefined;
        reason?: undefined;
    }>;
    manualSyncCalendar(): Promise<{
        days: number;
    }>;
    syncCrypto(symbols: string[], freqs: string[]): Promise<Record<string, number>>;
    syncCalendar(): Promise<{
        days: number;
    }>;
    private memTag;
    catchUpAshare(): Promise<{
        checked: number;
        healed: number;
        healedRows: number;
        errors: string[];
    }>;
    private addDays;
    private getLastCompletedTradingDay;
    syncAShareDaily(): Promise<void>;
    syncCryptoContinuous(): Promise<void>;
    syncIndexMonthly(): Promise<void>;
    syncIndexBars(): Promise<void>;
    runOnce(asset: string): Promise<void>;
}
