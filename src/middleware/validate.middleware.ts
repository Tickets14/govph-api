import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { HTTP_STATUS } from '../constants/common';
import { ErrorCode } from '../constants/error-codes';

/**
 * Zod validation middleware.
 *
 * The schema is expected to have optional top-level keys:
 *   body   → validated against req.body
 *   params → validated against req.params
 *   query  → validated against req.query
 *
 * On failure returns:
 *   { success: false, error: { code, message, details: { body?, params?, query? } } }
 */
export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await schema.safeParseAsync({
      body: req.body as unknown,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      // Group errors by section (body / params / query) for clarity
      const details: Record<string, unknown> = {};

      if (fieldErrors['body'] || hasNestedErrors(result.error, 'body')) {
        details['body'] = getSection(result.error, 'body');
      }
      if (fieldErrors['params'] || hasNestedErrors(result.error, 'params')) {
        details['params'] = getSection(result.error, 'params');
      }
      if (fieldErrors['query'] || hasNestedErrors(result.error, 'query')) {
        details['query'] = getSection(result.error, 'query');
      }

      // Fall back to flat fieldErrors if no section grouping matched
      const finalDetails = Object.keys(details).length > 0 ? details : fieldErrors;

      res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        error: {
          code: ErrorCode.VALIDATION_ERROR,
          message: 'Validation failed',
          details: finalDetails,
        },
      });
      return;
    }

    next();
  };
}

function hasNestedErrors(err: ZodError, section: string): boolean {
  return err.issues.some((i) => i.path[0] === section);
}

function getSection(err: ZodError, section: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of err.issues) {
    if (issue.path[0] === section) {
      const key = issue.path.slice(1).join('.') || '_root';
      (out[key] ??= []).push(issue.message);
    }
  }
  return out;
}
