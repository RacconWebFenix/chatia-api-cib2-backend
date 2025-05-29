import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { FeedbackService } from '../feedback/feedback.service';
import { ChatReply } from './chat.types';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly feedbackService: FeedbackService,
  ) {}

  @Post()
  async chat(@Body('message') message: string): Promise<ChatReply> {
    return this.chatService.handleFeedback(message);
  }

  @Get('feedbacks')
  async getFeedbacks(@Query('limit') limit?: string) {
    return this.feedbackService.findPositive(limit ? Number(limit) : 5);
  }
}
