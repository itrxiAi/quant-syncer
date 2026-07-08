import { Module } from '@nestjs/common';
import { BinanceAdapter } from './binance.adapter';
import { AkshareAdapter } from './akshare.adapter';

@Module({
  providers: [BinanceAdapter, AkshareAdapter],
  exports: [BinanceAdapter, AkshareAdapter],
})
export class AdaptersModule {}
