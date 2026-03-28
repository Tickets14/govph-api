import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3000,

  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_NAME: process.env.DB_NAME || 'govph_api',
  DATABASE_URL: process.env.DATABASE_URL,

  // Admin auth
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || '',

  // CORS — comma-separated list of allowed origins, or '*' for all
  CORS_ORIGINS: process.env.CORS_ORIGINS || '*',

  // Email (SMTP)
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_FROM: process.env.SMTP_FROM || 'GovPH Tracker <noreply@govph.com>',
  DEV_EMAIL: process.env.DEV_EMAIL || '',

  // Rate limiting
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 min
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 100,
} as const;
