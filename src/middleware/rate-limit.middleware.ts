import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import { HTTP_STATUS } from '../constants/common';
import { ErrorCode } from '../constants/error-codes';

const rateLimitResponse = (message: string) => ({
  success: false,
  error: {
    code: ErrorCode.RATE_LIMIT_EXCEEDED,
    message,
  },
});

/**
 * General rate limit applied to all public API routes.
 * Default: 100 requests per 15 minutes.
 * Configurable via RATE_LIMIT_WINDOW_MS and RATE_LIMIT_MAX env vars.
 */
export const publicRateLimit = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: 'draft-7', // RateLimit headers per RFC draft
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'test',
  message: rateLimitResponse('Too many requests — please try again later'),
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});

/**
 * Strict rate limit for write/mutating endpoints.
 * 30 requests per minute.
 */
export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => env.NODE_ENV === 'test',
  message: rateLimitResponse('Too many write requests — please slow down'),
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});
