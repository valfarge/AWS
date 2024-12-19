import { ApiResponse, ErrorDetails, ResponseMetrics } from './interfaces';

export const ResponseTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type ResponseType = typeof ResponseTypes[keyof typeof ResponseTypes];

export type ApiResponseData<T> = ApiResponse<T>;
export type ErrorDetailsType = ErrorDetails;
export type ResponseMetricsType = ResponseMetrics;