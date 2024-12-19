import { Response } from 'express';
import { ResponseMetrics } from './interfaces';

export const getResponseMetrics = (
  response: Response,
  startTime: number
): ResponseMetrics => ({
  statusCode: response.statusCode,
  contentLength: response.get('content-length'),
  responseTime: Date.now() - startTime,
  timestamp: new Date().toISOString(),
});

export const formatLogMessage = (
  method: string,
  url: string,
  metrics: ResponseMetrics,
  userAgent: string,
  ip: string
): string => {
  const { statusCode, contentLength, responseTime, timestamp } = metrics;
  return `[${timestamp}] ${method} ${url} ${statusCode} ${contentLength || '-'} ${responseTime}ms - ${userAgent} ${ip}`;
};