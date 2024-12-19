import { Request } from 'express';
import { RequestMetrics } from './interfaces';

export const captureRequestMetrics = (
  request: Request,
  startTime: number
): RequestMetrics => {
  return {
    method: request.method,
    path: request.path,
    query: request.query as Record<string, string>,
    duration: Date.now() - startTime,
    timestamp: new Date().toISOString(),
  };
};