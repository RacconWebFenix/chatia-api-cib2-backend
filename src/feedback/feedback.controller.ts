import { Controller, Get, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  async findAll() {
    return this.feedbackService.findAll();
  }

  @Get('positive')
  async findPositive(@Query('limit') limit?: string) {
    return this.feedbackService.findPositive(limit ? Number(limit) : undefined);
  }
}
