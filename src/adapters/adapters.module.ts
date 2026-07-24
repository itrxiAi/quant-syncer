import { Module } from '@nestjs/common';
import { BinanceAdapter } from './binance.adapter';
import { AkshareAdapter } from './akshare.adapter';
import { FredAdapter } from './fred.adapter';
import { PolymarketAdapter } from './polymarket.adapter';

@Module({
  providers: [BinanceAdapter, AkshareAdapter, FredAdapter, PolymarketAdapter],
  exports: [BinanceAdapter, AkshareAdapter, FredAdapter, PolymarketAdapter],
})
export class AdaptersModule {}
