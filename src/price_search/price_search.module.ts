import { Module } from '@nestjs/common';
import { PriceSearchService } from './price_search.service';
import { PriceSearchController } from './price_search.controller';

@Module({
  controllers: [PriceSearchController],
  providers: [PriceSearchService],
})
export class PriceSearchModule {}
