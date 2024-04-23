import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe
    (
      {

        forbidNonWhitelisted: true,
        transform: true,
      }
    ));

  app.setGlobalPrefix('api')
  await app.listen(3001);

  logger.log(`Running in the port: ${3001}`);
  logger.log(`Microservice Log-in lifted`);
}
bootstrap();
