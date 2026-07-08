import { BarRow } from './types';
export declare const FREQ_MS: Record<string, number>;
export declare class BinanceAdapter {
    fetchRecent(symbol: string, freq: string, limit?: number): Promise<BarRow[]>;
    fetchRange(symbol: string, freq: string, startMs: number, endMs?: number): Promise<BarRow[]>;
    private parseKlines;
    private curlJson;
}
