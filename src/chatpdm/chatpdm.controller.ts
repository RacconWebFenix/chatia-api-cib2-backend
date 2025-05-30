import { Controller, Post, Body } from '@nestjs/common';
import { ChatPdmService } from './chatpdm.service';

@Controller('chatpdm')
export class ChatPdmController {
  constructor(private readonly chatPdmService: ChatPdmService) {}

  @Post()
  async askPdm(@Body() body: any): Promise<unknown> {
    return this.chatPdmService.askPdm(body);
  }
}
