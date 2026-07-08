import { SpotResult, HistoryResult } from './types';
export declare class AkshareAdapter {
    fetchSpot(): Promise<SpotResult>;
    fetchHistory(qlibSym: string, start?: string, end?: string): Promise<HistoryResult>;
    fetchIndexHistory(qlibSym: string, start?: string, end?: string): Promise<HistoryResult>;
    fetchTradeCalendar(): Promise<{
        date: string;
        isOpen: boolean;
    }[]>;
    fetchIndexConstituents(indexSymbol: string): Promise<{
        symbol: string;
        inDate: string;
    }[]>;
}
