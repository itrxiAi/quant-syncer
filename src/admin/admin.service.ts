import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AkshareAdapter } from '../adapters/akshare.adapter';
import { Asset } from '../../generated/prisma/client';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private prisma: PrismaService,
    private akshare: AkshareAdapter,
  ) {}

  async syncIndex(indexCode: string, indexSymbol: string, name?: string) {
    this.logger.log(`syncing index ${indexCode} (${indexSymbol})...`);
    const constituents = await this.akshare.fetchIndexConstituents(indexSymbol);
    const newSymbols = new Set(constituents.map((c) => c.symbol));

    await this.prisma.index.upsert({
      where: { code: indexCode },
      create: { code: indexCode, name, asset: Asset.ashare },
      update: { name },
    });

    // Mark members no longer in the index as removed (outDate = today)
    const today = new Date();
    const activeMembers = await this.prisma.indexMember.findMany({
      where: { indexCode, outDate: null },
    });
    let removed = 0;
    for (const m of activeMembers) {
      if (!newSymbols.has(m.symbol)) {
        await this.prisma.indexMember.update({
          where: { indexCode_symbol_inDate: { indexCode, symbol: m.symbol, inDate: m.inDate } },
          data: { outDate: today },
        });
        removed++;
      }
    }

    // Insert new members (skip if already active)
    const activeSymbols = new Set(activeMembers.map((m) => m.symbol));
    let added = 0;
    for (const c of constituents) {
      if (activeSymbols.has(c.symbol)) continue;
      await this.prisma.indexMember.upsert({
        where: { indexCode_symbol_inDate: { indexCode, symbol: c.symbol, inDate: new Date(c.inDate) } },
        create: { indexCode, symbol: c.symbol, inDate: new Date(c.inDate) },
        update: {},
      });
      added++;
    }

    this.logger.log(`syncIndex ${indexCode}: ${constituents.length} constituents, +${added} -${removed}`);
    return { indexCode, total: constituents.length, added, removed };
  }
}
