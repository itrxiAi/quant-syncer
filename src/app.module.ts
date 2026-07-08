import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BarsModule } from './bars/bars.module';
import { CalendarModule } from './calendar/calendar.module';
import { AdaptersModule } from './adapters/adapters.module';
import { AdminModule } from './admin/admin.module';
import { SyncModule } from './sync/sync.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    AdaptersModule,
    BarsModule,
    CalendarModule,
    AdminModule,
    SyncModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
