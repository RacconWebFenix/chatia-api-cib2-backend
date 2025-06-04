import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { CreatePriceSearchDto } from './dto/create-price_search.dto';
import { ChatReply, PerplexityApiResponse } from 'src/chat.types';

@Injectable()
export class PriceSearchService {
  async searchPrice(dto: CreatePriceSearchDto): Promise<PerplexityApiResponse> {
    const body = {
      model: process.env.API_PERPLEXITY_MODEL,
      messages: [
        { role: 'system', content: process.env.SYSTEM_PROMPT_PRICE_SEARCH },
        { role: 'user', content: dto.text },
      ],
      temperature: 0.5,
      return_images: true,
      return_related_questions: false,
      stream: false,
      web_search_options: {
        search_context_size: process.env.API_PERPLEXITY_SEARCH_DEPTH,
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
      throw new Error(
        `Erro ao conectar com a API de busca de preços: ${errorMessage}`,
      );
    }
    const reply: ChatReply['reply'] = {
      citations: data?.citations,
      images: data?.images,
      text: data?.choices?.[0]?.message,
    };

    return reply;
  }
}
