import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/v1");
  app.enableCors({
      origin: ['http://localhost:3002', 'http://localhost:3000', 'https://31fb-14-241-225-130.ngrok-free.app'], // Domain frontend
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
