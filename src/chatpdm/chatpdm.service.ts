import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatPdmService {
  async askPdm({ text }: { text: string }): Promise<any> {
    const url = `${process.env.PDM_API_URL}`;

    // Monta o body padrão Gemini, inserindo o texto do usuário
    const body = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: 'Qual é o PDM (Padrão de Descriçao de Materiais) para o material apesquisado? Por favor, forneça uma resposta detalhada e completa.',
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1500,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE',
        },
      ],
    };

    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }
}
