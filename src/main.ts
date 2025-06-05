import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://meu-chat-ia.vercel.app',
  });
  await app.listen(process.env.PORT ?? 3001);
  // main.ts do NestJS
}
bootstrap();
