import app from './app';
import { env } from './config/env';
import db from './config/database';
import logger from './logging/logger';

function toError(err: unknown): Error {
  return err instanceof Error ? err : new Error(String(err));
}

async function bootstrap(): Promise<void> {
  // Verify DB connection
  try {
    await db.raw('SELECT 1');
    logger.info('Database connection established');
  } catch (err: unknown) {
    logger.error('Failed to connect to database', { error: toError(err) });
    process.exit(1);
  }

  const server = app.listen(env.PORT, () => {
    logger.info(`govph-api running on port ${env.PORT} [${env.NODE_ENV}]`);
  });

  // Graceful shutdown
  const shutdown = (signal: string): void => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(() => {
      void db
        .destroy()
        .then(() => {
          logger.info('Server closed');
          process.exit(0);
        })
        .catch((err: unknown) => {
          logger.error('Error during shutdown', { error: toError(err) });
          process.exit(1);
        });
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err: unknown) => {
  console.error('Fatal error during startup:', toError(err));
  process.exit(1);
});
