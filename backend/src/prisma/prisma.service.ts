import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
      log: ['error', 'warn', 'info'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database');
      
      // Verify database connection
      await this.$queryRaw`SELECT 1`;
      this.logger.log('Database connection verified');
    } catch (error) {
      this.logger.error(`Failed to connect to the database: ${error.message}`);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Successfully disconnected from the database');
    } catch (error) {
      this.logger.error(`Error disconnecting from database: ${error.message}`);
    }
  }
}