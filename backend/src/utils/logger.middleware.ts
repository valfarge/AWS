import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getRequestInfo } from './http/extractors';
import { getResponseMetrics, formatLogMessage } from './response/metrics';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const startTime = Date.now();
    const requestInfo = getRequestInfo(request);

    response.on('finish', () => {
      const metrics = getResponseMetrics(response, startTime);
      const logMessage = formatLogMessage(
        requestInfo.method,
        requestInfo.originalUrl,
        metrics,
        requestInfo.userAgent,
        requestInfo.clientIp
      );

      // Utilise la classe Logger directement sans 'this'
      Logger.log(logMessage, LoggerMiddleware.name);
    });

    next();
  }
}
