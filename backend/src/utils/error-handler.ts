import { Logger } from '@nestjs/common';

export class ErrorHandler {
  private static readonly logger = new Logger('ErrorHandler');

  static handle(error: Error, context: string): never {
    this.logger.error(`Error in ${context}: ${error.message}`);
    this.logger.debug(error.stack);
    throw error;
  }

  static async handleAsync<T>(
    promise: Promise<T>,
    context: string,
    errorMessage?: string
  ): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      this.logger.error(`Error in ${context}: ${errorMessage || error.message}`);
      this.logger.debug(error.stack);
      throw error;
    }
  }
}