import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Remova ou comente este método se não precisar dele
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
