import { PrismaService } from '../prisma/prisma.service';
import { AkshareAdapter } from '../adapters/akshare.adapter';
export declare class AdminService {
    private prisma;
    private akshare;
    private readonly logger;
    constructor(prisma: PrismaService, akshare: AkshareAdapter);
    syncIndex(indexCode: string, indexSymbol: string, name?: string): Promise<{
        indexCode: string;
        total: number;
        added: number;
        removed: number;
    }>;
}
