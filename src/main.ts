import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  Logger.log(`qlib-syncer running on http://0.0.0.0:${port}`, 'Bootstrap');
}
bootstrap();
