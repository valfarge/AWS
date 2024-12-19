import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { swaggerConfig } from './utils/swagger.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // Global middleware
    app.use(new LoggerMiddleware().use);
    
    // CORS configuration
    app.enableCors({
      origin: ['http://localhost:5173', 'https://ton-domaine.com'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    });
    
    // Validation
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }));

    // Swagger documentation
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    
    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log(`Swagger documentation available at: http://localhost:${port}/api`);
  } catch (error) {
    logger.error(`Failed to start application: ${error.message}`);
    process.exit(1);
  }
}

bootstrap();