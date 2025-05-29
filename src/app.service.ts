/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ChatService } from './chat/chat.service';
import { ChatReply } from './chat/chat.types';

@Injectable()
export class AppService {
  constructor(private readonly chatService: ChatService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Método para delegar o chat ao ChatService
  async chat(message: string): Promise<ChatReply> {
    return this.chatService.handleFeedback(message);
  }
}
