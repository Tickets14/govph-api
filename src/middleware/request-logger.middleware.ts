import { Request, Response, NextFunction } from 'express';
import logger from '../logging/logger';

/**
 * Structured request/response logger.
 * Logs: method, path, status, duration, IP on every response finish.
 * Uses warn for 4xx, error for 5xx, http for everything else.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startedAt = Date.now();
  const { method, originalUrl } = req;
  const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';

  res.on('finish', () => {
    const duration = Date.now() - startedAt;
    const status = res.statusCode;

    const meta = {
      method,
      path: originalUrl,
      status,
      duration_ms: duration,
      ip,
    };

    if (status >= 500) {
      logger.error(`${method} ${originalUrl} ${status} ${duration}ms`, meta);
    } else if (status >= 400) {
      logger.warn(`${method} ${originalUrl} ${status} ${duration}ms`, meta);
    } else {
      logger.http(`${method} ${originalUrl} ${status} ${duration}ms`, meta);
    }
  });

  next();
}
