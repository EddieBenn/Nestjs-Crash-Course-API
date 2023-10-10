import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest-API')
    .setDescription('this service is for nestjs crash course')
    .setVersion('2.0.0')
    .addTag('nestjs-crash-course')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documentationView', app, document);

  await app.listen(3000);
}
bootstrap();
