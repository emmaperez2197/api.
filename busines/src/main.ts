import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      // options: {
      //   host: 'redis',
      //   port: 6379,
      // },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, transform: true }),
  );

  await app.listen();

  logger.log(`Running microservicio Business`);
  logger.log(`Microservice Business lifted`);
}
bootstrap();
