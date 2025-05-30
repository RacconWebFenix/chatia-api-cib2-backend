import { Module } from '@nestjs/common';
import { ChatPdmController } from './chatpdm.controller';
import { ChatPdmService } from './chatpdm.service';

@Module({
  controllers: [ChatPdmController],
  providers: [ChatPdmService],
})
export class ChatPdmModule {}
