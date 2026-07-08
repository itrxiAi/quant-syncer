import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { Asset } from '@prisma/client';

@Controller('v1')
export class CalendarController {
  constructor(private prisma: PrismaService) {}

  @Get('calendar')
  @UseGuards(AuthGuard)
  async calendar(
    @Query('asset') asset: string = 'ashare',
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    const where: any = { asset: asset as Asset };
    if (start || end) {
      where.date = {};
      if (start) where.date.gte = new Date(start);
      if (end) where.date.lte = new Date(end);
    }
    const rows = await this.prisma.calendar.findMany({
      where,
      orderBy: { date: 'asc' },
    });
    return {
      asset,
      n: rows.length,
      grid: rows.map((r) => r.date.toISOString().slice(0, 10)),
    };
  }
}
