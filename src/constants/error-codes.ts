/**
 * Machine-readable error codes returned in every error response body.
 * Shape: { success: false, error: { code: ErrorCode, message: string } }
 */
export const ErrorCode = {
  // ── Validation ────────────────────────────────────────────────────────────
  VALIDATION_ERROR: 'VALIDATION_ERROR',

  // ── Auth ──────────────────────────────────────────────────────────────────
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  // ── Not Found ─────────────────────────────────────────────────────────────
  NOT_FOUND: 'NOT_FOUND',
  AGENCY_NOT_FOUND: 'AGENCY_NOT_FOUND',
  SERVICE_NOT_FOUND: 'SERVICE_NOT_FOUND',
  STEP_NOT_FOUND: 'STEP_NOT_FOUND',
  REQUIREMENT_NOT_FOUND: 'REQUIREMENT_NOT_FOUND',

  // ── Conflict ──────────────────────────────────────────────────────────────
  SLUG_CONFLICT: 'SLUG_CONFLICT',

  // ── Business logic ────────────────────────────────────────────────────────
  INVALID_PROGRESS: 'INVALID_PROGRESS',
  FEEDBACK_NOT_FOUND: 'FEEDBACK_NOT_FOUND',

  // ── Rate limiting ─────────────────────────────────────────────────────────
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

  // ── Server ────────────────────────────────────────────────────────────────
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
