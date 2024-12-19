import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ApiResponse, ErrorDetails } from './interfaces';
import { createSuccessResponse, createErrorResponse } from './creators';

export const sendResponse = <T>(
  response: Response,
  statusCode: number,
  data: ApiResponse<T>
): void => {
  response.status(statusCode).json(data);
};

export const sendSuccessResponse = <T>(
  response: Response,
  data: T,
  message?: string,
  metadata?: ApiResponse['metadata']
): void => {
  const responseData = createSuccessResponse(data, message, metadata);
  sendResponse(response, HttpStatus.OK, responseData);
};

export const sendCreatedResponse = <T>(
  response: Response,
  data: T,
  message = 'Resource created successfully'
): void => {
  const responseData = createSuccessResponse(data, message);
  sendResponse(response, HttpStatus.CREATED, responseData);
};

export const sendErrorResponse = (
  response: Response,
  statusCode: number,
  message: string,
  error?: any,
  details?: ErrorDetails[]
): void => {
  const responseData = createErrorResponse(message, error, details);
  sendResponse(response, statusCode, responseData);
};