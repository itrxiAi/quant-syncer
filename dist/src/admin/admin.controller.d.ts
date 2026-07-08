import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    syncIndex(body: {
        indexCode: string;
        indexSymbol: string;
        name?: string;
    }): Promise<{
        indexCode: string;
        total: number;
        added: number;
        removed: number;
    }>;
}
