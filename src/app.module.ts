import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ChatPdmModule } from './chatpdm/chatpdm.module';

@Module({
  imports: [ChatModule, FeedbackModule, ChatPdmModule],
})
export class AppModule {}
