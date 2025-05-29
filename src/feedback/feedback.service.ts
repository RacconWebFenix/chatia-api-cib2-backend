import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

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
