import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const logger = new Logger('DatabaseConfig');

export const getDatabaseConfig = (configService: ConfigService) => {
  const databaseUrl = configService.get<string>('DATABASE_URL');
  
  if (!databaseUrl) {
    logger.error('DATABASE_URL is not defined');
    throw new Error('Database configuration is missing');
  }

  return { url: databaseUrl };
};