import { Injectable } from '@nestjs/common';
import { FeedbackService } from '../feedback/feedback.service';
import axios, { AxiosResponse } from 'axios';
import { ChatReply, PerplexityApiResponse } from './chat.types';

@Injectable()
export class ChatService {
  constructor(private feedbackService: FeedbackService) {}

  async getDynamicPrompt(): Promise<string> {
    const feedbacksPositivos = await this.feedbackService.findPositive();
    const feedbacksNegativos =
      (await this.feedbackService.findNegative?.()) ??
      (await this.feedbackService.findByType?.('negativo')) ??
      []; // Use o método correto do seu FeedbackService

    let dynamicPart = '';

    if (feedbacksPositivos.length > 0) {
      dynamicPart +=
        '\nExemplos de respostas bem avaliadas pelos usuários:\n' +
        feedbacksPositivos
          .map(
            (f, i) =>
              `${i + 1}. Pergunta: ${f.prompt}\nResposta: ${f.response}\n`,
          )
          .join('\n');
    }

    if (feedbacksNegativos.length > 0) {
      dynamicPart +=
        '\nExemplos de respostas que NÃO agradaram os usuários (evite este tipo de resposta):\n' +
        feedbacksNegativos
          .map(
            (f, i) =>
              `${i + 1}. Pergunta: ${f.prompt}\nResposta: ${f.response}\n`,
          )
          .join('\n');
    }

    return (process.env.SYSTEM_PROMPT || '') + dynamicPart;
  }

  async handleFeedback(message: string): Promise<ChatReply> {
    const sanitizedPrompt: string = message.trim();

    const feedbackEntry =
      await this.feedbackService.createFeedback(sanitizedPrompt);

    const dynamicPrompt: string = await this.getDynamicPrompt();

    const body = {
      model: process.env.API_PERPLEXITY_MODEL,
      messages: [
        { role: 'system', content: dynamicPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.1,
      top_p: 0.6,
      return_images: true,
      return_related_questions: false,
      stream: false,
      web_search_options: {
        search_depth: process.env.API_PERPLEXITY_SEARCH_DEPTH,
      },
    };

    let data: PerplexityApiResponse;
    try {
      if (!process.env.API_PERPLEXITY_URL) {
        throw new Error('API_PERPLEXITY_URL is not defined');
      }
      const response: AxiosResponse<PerplexityApiResponse> = await axios.post(
        process.env.API_PERPLEXITY_URL,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.API_PERPLEXITY_KEY}`,
          },
        },
      );

      data = response.data;
    } catch (error: unknown) {
      let errorMessage: string = 'Erro desconhecido';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response
          ? JSON.stringify(error.response.data)
          : error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      await this.feedbackService.updateFeedbackResponse(
        feedbackEntry.id,
        `API_ERROR: ${errorMessage}`,
      );
      throw new Error('Erro ao conectar com a API externa');
    }

    const reply: ChatReply['reply'] = {
      citations: data?.citations,
      images: data?.images,
      text: data?.choices?.[0]?.message,
    };

    await this.feedbackService.updateFeedbackResponse(
      feedbackEntry.id,
      reply.text?.content || JSON.stringify(reply),
    );

    return { reply, feedbackId: feedbackEntry.id };
  }
}
