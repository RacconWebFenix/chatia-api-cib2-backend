import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { FeedbackService } from '../feedback/feedback.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, FeedbackService, PrismaService],
  exports: [ChatService],
})
export class ChatModule {}
