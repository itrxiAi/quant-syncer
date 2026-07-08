import { PrismaService } from '../prisma/prisma.service';
export declare class CalendarController {
    private prisma;
    constructor(prisma: PrismaService);
    calendar(asset?: string, start?: string, end?: string): Promise<{
        asset: string;
        n: number;
        grid: string[];
    }>;
}
