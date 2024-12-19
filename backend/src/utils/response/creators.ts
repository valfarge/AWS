import { ApiResponse, ErrorDetails } from './interfaces';

export const createSuccessResponse = <T>(
  data: T,
  message?: string,
  metadata?: ApiResponse['metadata']
): ApiResponse<T> => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
  metadata,
});

export const createErrorResponse = (
  message: string,
  error?: any,
  details?: ErrorDetails[]
): ApiResponse => ({
  success: false,
  message,
  error: error?.message || error,
  timestamp: new Date().toISOString(),
});

export const createValidationErrorResponse = (
  errors: Record<string, string[]>
): ApiResponse => ({
  success: false,
  message: 'Validation failed',
  error: 'Invalid input data',
  timestamp: new Date().toISOString(),
  validationErrors: Object.entries(errors).map(([field, messages]) => ({
    field,
    message: messages.join(', '),
    code: 'VALIDATION_ERROR',
  })),
});