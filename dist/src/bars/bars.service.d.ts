import { PrismaService } from '../prisma/prisma.service';
import { Asset, Freq } from '@prisma/client';
export interface BarInput {
    ts: Date;
    symbol: string;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
    volume: number | null;
    amount: number | null;
    factor: number;
    takerBuyBaseVolume?: number | null;
    vendor: string;
}
export declare class BarsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findBars(params: {
        asset: Asset;
        symbol?: string;
        symbols?: string[];
        index?: string;
        freq: Freq;
        start?: string;
        end?: string;
        fields?: string[];
    }): Promise<{
        symbol: string;
        open: number | null;
        high: number | null;
        low: number | null;
        close: number | null;
        volume: number | null;
        amount: number | null;
        factor: number;
        takerBuyBaseVolume: number | null;
        vendor: string | null;
        ts: Date;
        asset: import(".prisma/client").$Enums.Asset;
        freq: import(".prisma/client").$Enums.Freq;
        ingestTs: Date;
    }[]>;
    batchUpsert(asset: Asset, freq: Freq, bars: BarInput[]): Promise<number>;
    latestTs(asset: Asset, symbol: string, freq: Freq): Promise<Date | null>;
    private allSymbolsIndexCode;
    ensureSymbolsRegistered(asset: Asset, symbols: string[]): Promise<{
        total: number;
        added: number;
    }>;
    listSymbols(asset: Asset, freq: Freq): Promise<any[]>;
    listLatest(asset: Asset, freq: Freq): Promise<Record<string, string | null>>;
}
