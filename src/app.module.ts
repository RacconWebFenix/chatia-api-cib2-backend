import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackController } from './feedback/feedback.controller';

@Module({
  imports: [],
  controllers: [ChatController, FeedbackController],
  providers: [ChatService, FeedbackService, PrismaService],
})
export class AppModule {}
