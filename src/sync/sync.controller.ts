import { Controller, Post, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { AdminGuard } from '../auth/auth.guard';

@Controller('v1/admin')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('sync-ashare-spot')
  @UseGuards(AdminGuard)
  async syncAShareSpot() {
    this.syncService.manualSyncAShare();
    return { status: 'accepted', message: 'ashare sync started in background' };
  }

  @Post('sync-crypto')
  @UseGuards(AdminGuard)
  async syncCrypto() {
    return this.syncService.manualSyncCrypto();
  }

  @Post('sync-calendar')
  @UseGuards(AdminGuard)
  async syncCalendar() {
    return this.syncService.manualSyncCalendar();
  }

  @Post('sync-index-bars')
  @UseGuards(AdminGuard)
  async syncIndexBars() {
    this.syncService.syncIndexBars();
    return { status: 'accepted', message: 'index bars sync started' };
  }
}
