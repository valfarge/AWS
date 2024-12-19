import { Request } from 'express';

export const isValidHttpMethod = (method: string): boolean => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
  return validMethods.includes(method.toUpperCase());
};

export const hasRequiredHeaders = (request: Request, requiredHeaders: string[]): boolean => {
  return requiredHeaders.every(header => request.headers[header.toLowerCase()] !== undefined);
};

export const isSecure = (request: Request): boolean => {
  return request.secure || request.headers['x-forwarded-proto'] === 'https';
};