import type { Env } from '@/libs/types/env';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Env>);
  const port = configService.get<number>('PORT');

  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Server');
}

bootstrap().finally();
