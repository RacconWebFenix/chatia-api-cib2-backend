import { Controller, Post, Body } from '@nestjs/common';
import { PriceSearchService } from './price_search.service';
import { CreatePriceSearchDto } from './dto/create-price_search.dto';
import { PerplexityApiResponse } from 'src/chat.types';

@Controller('price-search')
export class PriceSearchController {
  constructor(private readonly priceSearchService: PriceSearchService) {}

  @Post()
  async search(
    @Body() dto: CreatePriceSearchDto,
  ): Promise<PerplexityApiResponse> {
    return this.priceSearchService.searchPrice(dto);
  }
}
