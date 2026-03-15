import winston from 'winston';
import { env } from '../config/env';

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp: ts, ...meta }) => {
    const extras = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    const safeLevel = typeof level === 'string' ? level : String(level);
    const safeMessage = typeof message === 'string' ? message : String(message);
    const safeTimestamp = typeof ts === 'string' ? ts : String(ts);
    return `${safeTimestamp} [${safeLevel}] ${safeMessage}${extras}`;
  })
);

const prodFormat = combine(timestamp(), errors({ stack: true }), json());

const logger = winston.createLogger({
  // 'http' (level 3) is between info (2) and verbose (4).
  // Use 'http' in production so request logs are captured; 'debug' in dev for everything.
  level: env.NODE_ENV === 'production' ? 'http' : 'debug',
  format: env.NODE_ENV === 'production' ? prodFormat : devFormat,
  transports: [new winston.transports.Console()],
  exitOnError: false,
});

export default logger;
