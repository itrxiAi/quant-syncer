import { Controller, Post, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { AdminGuard } from '../auth/auth.guard';

@Controller('v1/admin')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('sync-ashare-spot')
  @UseGuards(AdminGuard)
  async syncAShareSpot() {
    return this.syncService.syncAShareSpot();
  }

  @Post('sync-crypto')
  @UseGuards(AdminGuard)
  async syncCrypto() {
    return this.syncService.syncCrypto(
      ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'DOGEUSDT'],
      ['m5', 'm15', 'h1', 'h4', 'd1'],
    );
  }

  @Post('sync-calendar')
  @UseGuards(AdminGuard)
  async syncCalendar() {
    return this.syncService.syncCalendar();
  }
}
