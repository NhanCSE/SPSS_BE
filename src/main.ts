import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/v1");
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:8000'],
    credentials: true, // Allow credentials
  });
  await app.listen(3000);
}
bootstrap();
