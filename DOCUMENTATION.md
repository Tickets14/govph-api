# GOVPH API Documentation

## Overview

govph-api is a Node.js + Express + TypeScript REST API for browsing Philippine government agencies and services, plus tracking user progress through service steps. It exposes public read endpoints and admin-only write endpoints, and provides Swagger UI for interactive docs.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
# (edit values as needed)
copy .env.example .env

# Run database migrations
npm run migrate

# Seed initial data (optional)
npm run seed

# Run in development
npm run dev
```

Swagger UI is served at `http://localhost:3000/api/docs` by default.

## Tech Stack

- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- Database: PostgreSQL + Knex
- Validation: Zod
- Logging: Winston + request logger middleware
- Docs: Swagger (swagger-jsdoc + swagger-ui-express)
- Testing: Jest

## Project Structure

- `src/app.ts`: Express app setup and middleware pipeline.
- `src/server.ts`: App bootstrap, DB connection verification, graceful shutdown.
- `src/routes/`: Route registration per resource.
- `src/controllers/`: HTTP controllers, response formatting.
- `src/services/`: Business logic and orchestration.
- `src/repositories/`: Data access via Knex.
- `src/middleware/`: CORS, auth guard, rate limiting, validation, error handling.
- `src/config/`: Environment and database configuration.
- `src/types/`: Shared TypeScript types.
- `src/dto/`: Zod schemas for request validation.
- `database/migrations/`: Database schema migrations.
- `database/seeds/`: Seed data (agencies, services, steps, requirements).

## Configuration

Environment variables are defined in `src/config/env.ts` and mirrored in `.env.example`.

| Variable               | Description                                             | Default       |
| ---------------------- | ------------------------------------------------------- | ------------- |
| `NODE_ENV`             | Environment name                                        | `development` |
| `PORT`                 | HTTP port                                               | `3000`        |
| `DB_HOST`              | PostgreSQL host                                         | `localhost`   |
| `DB_PORT`              | PostgreSQL port                                         | `5432`        |
| `DB_USER`              | PostgreSQL user                                         | `postgres`    |
| `DB_PASSWORD`          | PostgreSQL password                                     | `postgres`    |
| `DB_NAME`              | PostgreSQL database name                                | `govph_api`   |
| `DATABASE_URL`         | Full connection string (overrides individual DB fields) | unset         |
| `ADMIN_API_KEY`        | Admin key used for write routes                         | empty         |
| `CORS_ORIGINS`         | Comma-separated allowed origins or `*`                  | `*`           |
| `RATE_LIMIT_WINDOW_MS` | Public rate limit window in ms                          | `900000`      |
| `RATE_LIMIT_MAX`       | Public rate limit max requests                          | `100`         |

## Runtime Behavior

Middleware order is defined in `src/app.ts`:

- `helmet` security headers.
- `cors` (configurable by `CORS_ORIGINS`).
- JSON and URL-encoded body parsers (1MB limit).
- Structured request logging (Winston).
- Public rate limiting (applied to `/api/v1` routes).
- Swagger UI (`/api/docs`).
- API routes.
- 404 handler.
- Global error handler.

## Authentication and Headers

Two headers control access and progress tracking:

- `X-Admin-Key`: Required for all admin routes (create/update/delete operations).
  - If `ADMIN_API_KEY` is missing in production, admin requests are rejected.
  - In development, missing `ADMIN_API_KEY` logs a warning and allows access.
- `X-User-Id`: Required for all progress endpoints and for `/services/:slug/progress`.
  - This is treated as required input, not a credential.

## Rate Limiting

Implemented in `src/middleware/rate-limit.middleware.ts`:

- Public routes: 100 requests / 15 minutes (configurable via env).
- Write routes: 30 requests / 1 minute.
- Test environment skips rate limiting.
- Response headers include `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`.

## Error Format

All errors return a consistent shape:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": { "body": { "field": ["message"] } }
  }
}
```

Key error codes are defined in `src/constants/error-codes.ts`, including:
`VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `AGENCY_NOT_FOUND`,
`SERVICE_NOT_FOUND`, `STEP_NOT_FOUND`, `REQUIREMENT_NOT_FOUND`, `SLUG_CONFLICT`,
`INVALID_PROGRESS`, `RATE_LIMIT_EXCEEDED`, `INTERNAL_ERROR`.

## Response Format

Success responses:

```json
{ "success": true, "data": { ... }, "message": "optional" }
```

Paginated responses:

```json
{
  "success": true,
  "data": [ ... ],
  "meta": { "total": 10, "page": 1, "limit": 20, "totalPages": 1 }
}
```

## Database Schema

Defined in `database/migrations/`.

- `agencies`:
  `id`, `name`, `slug`, `website_url`, `logo_url`, `created_at`, `updated_at`
- `services`:
  `id`, `agency_id`, `name`, `slug`, `description`, `estimated_time`,
  `appointment_url`, `is_active`, `created_at`, `updated_at`
  - `agency_id` -> `agencies.id`
- `steps`:
  `id`, `service_id`, `order`, `title`, `description`, `is_optional`,
  `created_at`, `updated_at`
  - `service_id` -> `services.id`
  - Unique constraint: (`service_id`, `order`)
- `requirements`:
  `id`, `step_id`, `service_id`, `name`, `description`, `is_optional`, `notes`,
  `created_at`, `updated_at`
  - `step_id` -> `steps.id`
  - `service_id` -> `services.id`
- `user_progress`:
  `id`, `user_id`, `service_id`, `step_id`, `is_completed`, `completed_at`
  - Unique constraint: (`user_id`, `service_id`, `step_id`)

Seed data is available in `database/seeds/` for agencies, services, steps, and requirements.

## API Reference

Base path: `/api/v1`

Swagger UI: `/api/docs`

### Endpoints

| Method | Path                                 | Auth        | Description                              |
| ------ | ------------------------------------ | ----------- | ---------------------------------------- |
| GET    | `/health`                            | Public      | Health check                             |
| GET    | `/agencies`                          | Public      | List agencies (paginated)                |
| GET    | `/agencies/:slug`                    | Public      | Get agency by slug                       |
| POST   | `/agencies`                          | Admin       | Create agency                            |
| PUT    | `/agencies/:id`                      | Admin       | Update agency                            |
| DELETE | `/agencies/:id`                      | Admin       | Delete agency                            |
| GET    | `/services`                          | Public      | List services (filter + pagination)      |
| GET    | `/services/:slug`                    | Public      | Service detail with steps + requirements |
| GET    | `/services/:slug/progress`           | `X-User-Id` | Service detail with progress merged      |
| POST   | `/services`                          | Admin       | Create service                           |
| PUT    | `/services/:id`                      | Admin       | Update service                           |
| DELETE | `/services/:id`                      | Admin       | Delete service                           |
| POST   | `/services/:serviceId/steps`         | Admin       | Add step to service                      |
| PATCH  | `/services/:serviceId/steps/reorder` | Admin       | Reorder steps                            |
| PUT    | `/steps/:id`                         | Admin       | Update step                              |
| DELETE | `/steps/:id`                         | Admin       | Delete step                              |
| POST   | `/steps/:stepId/requirements`        | Admin       | Add requirement to step                  |
| PUT    | `/requirements/:id`                  | Admin       | Update requirement                       |
| DELETE | `/requirements/:id`                  | Admin       | Delete requirement                       |
| GET    | `/progress/:serviceId`               | `X-User-Id` | Get progress summary                     |
| POST   | `/progress/:serviceId/toggle`        | `X-User-Id` | Toggle step completion                   |
| DELETE | `/progress/:serviceId`               | `X-User-Id` | Reset progress for a service             |

### Query Parameters

`GET /services` supports:

- `search`: full-text search across service name, description, and agency name.
- `agency_id`: filter by agency UUID.
- `is_active`: `true` or `false`.
- `page`, `limit`: pagination.

`GET /agencies` supports:

- `page`, `limit`: pagination.

### Request Bodies (Common)

- Create service: `agency_id`, `name`, `slug`, `description`, optional `estimated_time`, `appointment_url`, `is_active`.
- Create step: `order`, `title`, optional `description`, `is_optional`.
- Reorder steps: `step_ids: string[]`.
- Create requirement: `service_id`, `name`, optional `description`, `is_optional`, `notes`.
- Toggle progress: `step_id`.

## Logging

Winston logs are configured in `src/logging/logger.ts`.

- Development: colorized console logs.
- Production: JSON logs.
- Request logs include method, path, status, duration, and IP.

## Testing

Jest is configured in `package.json` with TypeScript support.

```bash
npm run test
npm run test:watch
npm run test:cov
```

## Build and Run

```bash
# Build TypeScript
npm run build

# Run compiled server
npm run start
```

## Notes and Gotchas

- `/services/:slug/progress` must be registered before `/:slug` to avoid route conflicts; this is handled in `src/routes/services.routes.ts`.
- Admin routes are rate-limited more strictly than public routes.
- The default README is still the NestJS template; `DOCUMENTATION.md` is the project-specific reference.
