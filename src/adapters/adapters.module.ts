import { Module } from '@nestjs/common';
import { BinanceAdapter } from './binance.adapter';
import { AkshareAdapter } from './akshare.adapter';
import { FredAdapter } from './fred.adapter';
import { FrankfurterAdapter } from './frankfurter.adapter';
import { PolymarketAdapter } from './polymarket.adapter';

@Module({
  providers: [BinanceAdapter, AkshareAdapter, FredAdapter, FrankfurterAdapter, PolymarketAdapter],
  exports: [BinanceAdapter, AkshareAdapter, FredAdapter, FrankfurterAdapter, PolymarketAdapter],
})
export class AdaptersModule {}
