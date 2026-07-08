export interface BarRow {
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
export interface SpotResult {
    bars: BarRow[];
    vendor: string;
}
export interface HistoryResult {
    bars: BarRow[];
    vendor: string;
}
