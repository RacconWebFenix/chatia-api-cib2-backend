import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ChatPdmModule } from './chatpdm/chatpdm.module';
import { PriceSearchModule } from './price_search/price_search.module';

@Module({
  imports: [ChatModule, FeedbackModule, ChatPdmModule, PriceSearchModule],
})
export class AppModule {}
