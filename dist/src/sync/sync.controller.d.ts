import { SyncService } from './sync.service';
export declare class SyncController {
    private readonly syncService;
    constructor(syncService: SyncService);
    syncAShareSpot(): Promise<{
        status: string;
        message: string;
    }>;
    syncCrypto(): Promise<Record<string, number> | {
        skipped: boolean;
        reason: string;
        error?: undefined;
    } | {
        error: string;
        skipped?: undefined;
        reason?: undefined;
    }>;
    syncCalendar(): Promise<{
        days: number;
    }>;
    syncIndexBars(): Promise<{
        status: string;
        message: string;
    }>;
}
