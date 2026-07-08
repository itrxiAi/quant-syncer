import { SyncService } from './sync.service';
export declare class SyncController {
    private readonly syncService;
    constructor(syncService: SyncService);
    syncAShareSpot(): Promise<{
        symbols: number;
        rows: number;
        vendor: string;
    }>;
    syncCrypto(): Promise<Record<string, number>>;
    syncCalendar(): Promise<{
        days: number;
    }>;
}
