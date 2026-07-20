import { Controller, Get, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { BarsService } from './bars.service';
import { AuthGuard } from '../auth/auth.guard';
import { Asset, Freq } from '@prisma/client';

@Controller('v1')
export class BarsController {
  constructor(private readonly barsService: BarsService) {}

  @Get('bars')
  @UseGuards(AuthGuard)
  async bars(
    @Query('asset') asset: string = 'ashare',
    @Query('symbol') symbol?: string,
    @Query('symbols') symbols?: string,
    @Query('index') index?: string,
    @Query('freq') freq: string = 'd1',
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Query('fields') fields?: string,
    @Query('page_token') pageToken?: string,
    @Query('limit') limit?: string,
  ) {
    if (!symbol && !symbols && !index) {
      throw new BadRequestException('one of symbol, symbols, or index is required');
    }
    const syms = symbols ? symbols.split(',').map((s) => s.trim()).filter(Boolean) : undefined;
    const flds = fields ? fields.split(',').map((f) => f.trim()).filter(Boolean) : undefined;
    return this.barsService.findBars({
      asset: asset as Asset,
      symbol,
      symbols: syms,
      index,
      freq: freq as Freq,
      start,
      end,
      fields: flds,
      pageToken,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get('symbols')
  @UseGuards(AuthGuard)
  async symbols(
    @Query('asset') asset: string = 'ashare',
    @Query('freq') freq: string = 'd1',
  ) {
    return {
      asset,
      freq,
      symbols: await this.barsService.listSymbols(asset as Asset, freq as Freq),
    };
  }

  @Get('latest')
  @UseGuards(AuthGuard)
  async latest(
    @Query('asset') asset: string = 'ashare',
    @Query('freq') freq: string = 'd1',
  ) {
    return this.barsService.listLatest(asset as Asset, freq as Freq);
  }
}
