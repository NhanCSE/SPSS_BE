import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/v1");
  app.enableCors({
      origin: 'http://localhost:3000', // Domain frontend
      methods: 'GET,POST,PUT,DELETE',
      credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
