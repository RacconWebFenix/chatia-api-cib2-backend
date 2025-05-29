import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async createFeedback(prompt: string) {
    return this.prisma.feedback.create({
      data: {
        prompt,
        response: 'PENDING_RESPONSE',
      },
    });
  }

  async updateFeedbackResponse(id: string, response: string) {
    return this.prisma.feedback.update({
      where: { id },
      data: { response },
    });
  }

  async updateUserFeedback(
    id: string,
    rating?: number | null,
    comment?: string,
    userFeedback?: 'positivo' | 'negativo',
  ) {
    return this.prisma.feedback.update({
      where: { id },
      data: {
        rating,
        comment,
        userFeedback,
      },
    });
  }

  async findAll() {
    return this.prisma.feedback.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findPositive(limit?: number) {
    return this.prisma.feedback.findMany({
      where: { userFeedback: 'positivo' },
      orderBy: { id: 'desc' },
      take: limit,
    });
  }
}
