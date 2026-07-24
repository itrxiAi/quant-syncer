import { Module } from '@nestjs/common';
import { MacroService } from './macro.service';
import { MacroController } from './macro.controller';
import { AdaptersModule } from '../adapters/adapters.module';
import { BarsModule } from '../bars/bars.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AdaptersModule, BarsModule, PrismaModule],
  controllers: [MacroController],
  providers: [MacroService],
  exports: [MacroService],
})
export class MacroModule {}
