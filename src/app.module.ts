import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';

@Module({
  imports: [],
  controllers: [ChatController, FeedbackController],
  providers: [PrismaService, ChatService, FeedbackService],
})
export class AppModule {}
