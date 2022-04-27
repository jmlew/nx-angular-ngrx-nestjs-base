/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // Ensure local proxy defined in web-app/proxy.conf.json aligns.
  const port = process.env.NX_MOCK_API_PORT;
  await app.listen(port);
  Logger.log(`Nest app is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
