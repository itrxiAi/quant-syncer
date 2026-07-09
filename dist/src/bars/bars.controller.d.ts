import { BarsService } from './bars.service';
export declare class BarsController {
    private readonly barsService;
    constructor(barsService: BarsService);
    bars(asset?: string, symbol?: string, symbols?: string, index?: string, freq?: string, start?: string, end?: string, fields?: string): Promise<{
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
    symbols(asset?: string, freq?: string): Promise<{
        asset: string;
        freq: string;
        symbols: any[];
    }>;
    latest(asset?: string, freq?: string): Promise<Record<string, string | null>>;
}
