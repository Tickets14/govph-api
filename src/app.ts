import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { corsMiddleware } from './middleware/cors.middleware';
import { requestLogger } from './middleware/request-logger.middleware';
import { publicRateLimit } from './middleware/rate-limit.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { API_PREFIX } from './constants/common';
import { swaggerSpec } from './swagger';
import router from './routes';

const app = express();

// ── 1. Security headers ──────────────────────────────────────────────────────
// Sets X-Content-Type-Options, X-Frame-Options, HSTS, etc.
app.use(helmet());

// ── 2. CORS ──────────────────────────────────────────────────────────────────
// Must come before any route handlers so preflight OPTIONS requests are handled.
app.use(corsMiddleware);

// ── 3. Body parsing ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── 4. Structured request logging ────────────────────────────────────────────
// Placed after body parsing so req.body is available if we ever need it in logs.
app.use(requestLogger);

// ── 5. Rate limiting ─────────────────────────────────────────────────────────
// Applied only to the versioned API prefix to leave health checks unrestricted.
app.use(API_PREFIX, publicRateLimit);

// ── 6. Swagger UI ─────────────────────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── 7. API routes ─────────────────────────────────────────────────────────────
app.use(API_PREFIX, router);

// ── 8. 404 — must be after all routes ────────────────────────────────────────
app.use(notFoundHandler);

// ── 9. Global error handler — must be last, 4-arg signature required ─────────
app.use(errorHandler);

export default app;
