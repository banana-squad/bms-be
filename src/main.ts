import { EnvService } from '@/libs/env/env.service';
import { PrismaClientExceptionFilter } from '@/libs/filters/prisma-exception.filter';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);
  const port = env.get('PORT');

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Server');
}

bootstrap().finally();
