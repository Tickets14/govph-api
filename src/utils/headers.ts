import { Request } from 'express';
import { ValidationError } from '../middleware/error.middleware';

/**
 * Extracts the X-User-Id header used for anonymous progress tracking.
 * Throws 422 ValidationError if the header is absent or blank.
 *
 * This is intentionally a validation error (not auth) because X-User-Id
 * is a required input parameter, not a credential.
 */
export function getUserId(req: Request): string {
  const raw = req.headers['x-user-id'];
  if (!raw || typeof raw !== 'string' || raw.trim() === '') {
    throw new ValidationError('X-User-Id header is required and must be a non-empty string');
  }
  return raw.trim();
}
