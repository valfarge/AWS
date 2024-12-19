export interface ResponseMetrics {
  statusCode: number;
  contentLength?: string;
  responseTime: number;
  timestamp: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
    lastPage?: number;
  };
  validationErrors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}

export interface ErrorDetails {
  code?: string;
  field?: string;
  message: string;
}