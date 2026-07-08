import { SyncService } from './sync.service';
export declare class SyncController {
    private readonly syncService;
    constructor(syncService: SyncService);
    syncAShareSpot(): Promise<{
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
}
