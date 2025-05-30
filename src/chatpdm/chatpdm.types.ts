// Tipos para o body do POST
export interface ChatPdmPart {
  text: string;
}

export interface ChatPdmContent {
  role: 'user' | 'model';
  parts: ChatPdmPart[];
}

export interface ChatPdmGenerationConfig {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
}

export interface ChatPdmSafetySetting {
  category: string;
  threshold: string;
}

export interface ChatPdmRequestBody {
  contents: ChatPdmContent[];
  generationConfig: ChatPdmGenerationConfig;
  safetySettings: ChatPdmSafetySetting[];
}

// Tipos para a resposta do endpoint
export interface ChatPdmCandidateContentPart {
  text: string;
}

export interface ChatPdmCandidateContent {
  parts: ChatPdmCandidateContentPart[];
  role: 'model';
}

export interface ChatPdmCandidate {
  content: ChatPdmCandidateContent;
  finishReason: string;
  safetyRatings: {
    category: string;
    probability: string;
  }[];
  avgLogprobs: number;
}

export interface ChatPdmUsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  promptTokensDetails: { modality: string; tokenCount: number }[];
  candidatesTokensDetails: { modality: string; tokenCount: number }[];
}

export interface ChatPdmResponse {
  candidates: ChatPdmCandidate[];
  usageMetadata: ChatPdmUsageMetadata;
  modelVersion: string;
  responseId: string;
}
