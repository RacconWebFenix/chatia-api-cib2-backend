import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria um novo feedback com prompt e resposta pendente
  async createFeedback(prompt: string) {
    return this.prisma.feedback.create({
      data: {
        prompt,
        response: 'PENDING_RESPONSE',
      },
    });
  }

  // Atualiza a resposta do feedback (usado após resposta da IA)
  async updateFeedbackResponse(id: string, response: string) {
    return this.prisma.feedback.update({
      where: { id },
      data: { response },
    });
  }

  // Atualiza avaliação do usuário (nota, comentário, positivo/negativo)
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

  // Busca feedbacks positivos
  async findPositive(limit = 15) {
    return this.prisma.feedback.findMany({
      where: { userFeedback: 'positivo' },
      orderBy: { id: 'desc' },
      take: limit,
    });
  }

  // Busca feedbacks negativos
  async findNegative(limit = 15) {
    return this.prisma.feedback.findMany({
      where: { userFeedback: 'negativo' },
      orderBy: { id: 'desc' },
      take: limit,
    });
  }

  // Busca feedbacks por tipo (positivo/negativo)
  async findByType(type: 'positivo' | 'negativo', limit = 15) {
    return this.prisma.feedback.findMany({
      where: { userFeedback: type },
      orderBy: { id: 'desc' },
      take: limit,
    });
  }

  // Busca todos os feedbacks
  async findAll() {
    return this.prisma.feedback.findMany({
      orderBy: { timestamp: 'desc' }, // ordem crescente de criação
    });
  }
}
