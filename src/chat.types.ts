export interface ChatReply {
  reply: {
    citations?: unknown[];
    images?: unknown[];
    text?: {
      content: string;
      [key: string]: unknown;
    };
  };
  feedbackId: string; // deve ser number, não string
}

// Tipagem para resposta da API externa (opcional, mas recomendado)
export interface PerplexityApiChoice {
  message: {
    content: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface PerplexityApiResponse {
  citations?: unknown[];
  images?: unknown[];
  choices?: PerplexityApiChoice[];
  [key: string]: unknown;
}
