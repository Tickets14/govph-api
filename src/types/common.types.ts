import { ErrorCode } from '../constants/error-codes';

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Shape returned by all successful responses */
export interface ApiResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

/** Shape returned by all error responses */
export interface ErrorResponse {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
}
