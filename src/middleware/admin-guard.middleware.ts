import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { UnauthorizedError, ForbiddenError } from './error.middleware';

/**
 * Protects admin-only routes via the X-Admin-Key request header.
 *
 * - In production: key must match ADMIN_API_KEY env var; missing key → 401.
 * - In development: if ADMIN_API_KEY is not set, the guard is skipped with a
 *   console warning so local development still works out of the box.
 */
export function adminGuard(req: Request, _res: Response, next: NextFunction): void {
  // No key configured
  if (!env.ADMIN_API_KEY) {
    if (env.NODE_ENV === 'production') {
      return next(new ForbiddenError('Admin access is not configured on this server'));
    }
    // Development: warn and pass through
    console.warn('[admin-guard] ADMIN_API_KEY is not set — admin routes are unprotected');
    return next();
  }

  const providedKey = req.headers['x-admin-key'];

  if (!providedKey) {
    return next(new UnauthorizedError('Missing X-Admin-Key header'));
  }

  if (providedKey !== env.ADMIN_API_KEY) {
    return next(new UnauthorizedError('Invalid X-Admin-Key'));
  }

  next();
}
