import { ApiResponse } from './interfaces';

export const createPaginationMetadata = (
  total: number,
  page: number,
  limit: number
): ApiResponse['metadata'] => ({
  page,
  limit,
  total,
  lastPage: Math.ceil(total / limit),
});

export const isSuccessStatus = (statusCode: number): boolean => 
  statusCode >= 200 && statusCode < 300;

export const isClientErrorStatus = (statusCode: number): boolean => 
  statusCode >= 400 && statusCode < 500;

export const isServerErrorStatus = (statusCode: number): boolean => 
  statusCode >= 500 && statusCode < 600;