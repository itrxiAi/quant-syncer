import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { AdminModule } from '../admin/admin.module';
import { AdaptersModule } from '../adapters/adapters.module';
import { BarsModule } from '../bars/bars.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [ScheduleModule.forRoot(), AdminModule, AdaptersModule, BarsModule, PrismaModule, NotifyModule],
  controllers: [SyncController],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
