import { Controller, Post, Get, Query, UseGuards } from '@nestjs/common';
import { MacroService } from './macro.service';
import { AdminGuard, AuthGuard } from '../auth/auth.guard';

@Controller('v1/admin')
export class MacroController {
  constructor(private readonly macroService: MacroService) {}

  @Post('sync-macro')
  @UseGuards(AdminGuard)
  async syncMacro() {
    return this.macroService.manualSyncMacro();
  }

  @Get('macro-markets')
  @UseGuards(AuthGuard)
  async macroMarkets(@Query('active') active?: string) {
    const activeOnly = active !== 'false';
    return { markets: await this.macroService.listMacroMarkets(activeOnly) };
  }
}
