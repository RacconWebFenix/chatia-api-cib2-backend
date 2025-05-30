import {
  Controller,
  Get,
  Query,
  Post,
  Put,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
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
    return this.feedbackService.findPositive(limit ? Number(limit) : 5);
  }

  // POST /feedbacks - criar feedback (caso queira criar manualmente)
  @Post()
  async create(@Body('prompt') prompt: string) {
    return this.feedbackService.createFeedback(prompt);
  }

  // PUT /feedbacks - atualizar feedback do usuário
  @Put()
  async updateUserFeedback(
    @Body('feedbackId') feedbackId: string,
    @Body('rating') rating: number,
    @Body('comment') comment: string,
    @Body('userFeedback') userFeedback: 'positivo' | 'negativo',
  ) {
    return this.feedbackService.updateUserFeedback(
      feedbackId,
      rating,
      comment,
      userFeedback,
    );
  }

  // DELETE /feedbacks/:id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(id);
  }
}
