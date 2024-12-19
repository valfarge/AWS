import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Authentication API')
  .setDescription('API for user authentication with phone verification')
  .setVersion('1.0')
  .addTag('auth')
  .addBearerAuth()
  .build();