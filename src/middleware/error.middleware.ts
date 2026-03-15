import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '../constants/common';
import { ErrorCode } from '../constants/error-codes';
import logger from '../logging/logger';

// ─── Base error ───────────────────────────────────────────────────────────────

export class AppError extends Error {
  constructor(
    public override message: string,
    public readonly statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    public readonly code: ErrorCode = ErrorCode.INTERNAL_ERROR,
    public readonly isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── 401 / 403 ────────────────────────────────────────────────────────────────

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, HTTP_STATUS.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, HTTP_STATUS.FORBIDDEN, ErrorCode.FORBIDDEN);
  }
}

// ─── 404 Not Found hierarchy ──────────────────────────────────────────────────

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', code: ErrorCode = ErrorCode.NOT_FOUND) {
    super(message, HTTP_STATUS.NOT_FOUND, code);
  }
}

export class AgencyNotFoundError extends NotFoundError {
  constructor(identifier?: string) {
    super(identifier ? `Agency '${identifier}' not found` : 'Agency not found', ErrorCode.AGENCY_NOT_FOUND);
  }
}

export class ServiceNotFoundError extends NotFoundError {
  constructor(identifier?: string) {
    super(identifier ? `Service '${identifier}' not found` : 'Service not found', ErrorCode.SERVICE_NOT_FOUND);
  }
}

export class StepNotFoundError extends NotFoundError {
  constructor(identifier?: string) {
    super(identifier ? `Step '${identifier}' not found` : 'Step not found', ErrorCode.STEP_NOT_FOUND);
  }
}

export class RequirementNotFoundError extends NotFoundError {
  constructor(identifier?: string) {
    super(
      identifier ? `Requirement '${identifier}' not found` : 'Requirement not found',
      ErrorCode.REQUIREMENT_NOT_FOUND
    );
  }
}

// ─── 409 Conflict ─────────────────────────────────────────────────────────────

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, HTTP_STATUS.CONFLICT, ErrorCode.SLUG_CONFLICT);
  }
}

// ─── 422 Validation / business logic ─────────────────────────────────────────

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, ErrorCode.VALIDATION_ERROR);
  }
}

export class InvalidProgressError extends AppError {
  constructor(message = 'Invalid progress operation') {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, ErrorCode.INVALID_PROGRESS);
  }
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  void _next;
  // Zod schema validation errors
  if (err instanceof ZodError) {
    res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      success: false,
      error: {
        code: ErrorCode.VALIDATION_ERROR,
        message: 'Validation failed',
        details: err.flatten().fieldErrors,
      },
    });
    return;
  }

  // Known AppError hierarchy
  if (err instanceof AppError) {
    // Always log 5xx AppErrors with a full stack trace — these indicate
    // something unexpected even when the error is technically "operational".
    if (err.statusCode >= 500) {
      logger.error('Application error', {
        code: err.code,
        message: err.message,
        stack: err.stack,
        method: req.method,
        path: req.path,
      });
    }
    res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
    });
    return;
  }

  // Unexpected / unhandled errors
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
  });
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: ErrorCode.INTERNAL_ERROR,
      message: 'An unexpected error occurred',
    },
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    error: {
      code: ErrorCode.NOT_FOUND,
      message: `Cannot ${req.method} ${req.path}`,
    },
  });
}
