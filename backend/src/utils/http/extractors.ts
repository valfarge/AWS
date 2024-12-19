import { Request } from 'express';
import { RequestInfo } from './interfaces';

export const getClientIp = (request: Request): string => {
  return (
    request.ip ||
    (request.headers['x-forwarded-for'] as string) ||
    request.socket.remoteAddress ||
    'unknown'
  );
};

export const getRequestHeaders = (request: Request): Record<string, string | string[] | undefined> => {
  return {
    ...request.headers,
    'user-agent': request.get('user-agent'),
    'content-type': request.get('content-type'),
    'accept': request.get('accept'),
  };
};

export const getRequestInfo = (request: Request): RequestInfo => {
  const { method, originalUrl } = request;
  const userAgent = request.get('user-agent') || '';
  const clientIp = getClientIp(request);
  const headers = getRequestHeaders(request);

  return {
    method,
    originalUrl,
    userAgent,
    clientIp,
    timestamp: new Date().toISOString(),
    headers,
  };
};