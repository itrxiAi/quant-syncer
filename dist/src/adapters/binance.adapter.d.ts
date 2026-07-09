import { BarRow } from './types';
export declare const FREQ_MS: Record<string, number>;
export declare class BinanceAdapter {
    fetchRecent(symbol: string, freq: string, limit?: number): Promise<BarRow[]>;
    fetchRange(symbol: string, freq: string, startMs: number, endMs?: number): Promise<BarRow[]>;
    fetchRangeStream(symbol: string, freq: string, startMs: number, onBatch: (bars: BarRow[]) => Promise<void>, endMs?: number): Promise<number>;
    private parseKlines;
    private curlJson;
}
