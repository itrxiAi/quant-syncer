import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import compression = require('compression');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.enableCors();
  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  Logger.log(`qlib-syncer running on http://0.0.0.0:${port}`, 'Bootstrap');
}
bootstrap();
