// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerMiddleware = new LoggerMiddleware();

  app.use(loggerMiddleware.use);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
