# Architecture

## Overview

The API follows a layered architecture:

Routes → Controllers → Services → Repositories → Database

Each layer has a single responsibility and communicates via TypeScript types.

## Request Flow

```text
HTTP Request
  ↓
Express Router (src/routes)
  ↓
Validation (Zod + validate middleware)
  ↓
Controller (src/controllers)
  ↓
Service (src/services)
  ↓
Repository (src/repositories)
  ↓
PostgreSQL (Knex)
  ↓
Controller → Response helpers
```

## Composition

Dependencies are wired in `src/container/index.ts`:

- Repositories are instantiated first.
- Services are created with repository dependencies.
- Controllers are created with service dependencies.

This keeps construction centralized and avoids cross-module imports.

## Key Modules

### Routing

`src/routes/index.ts` mounts all resource routes under `/api/v1`. Each resource file registers its own endpoints and applies validation and auth middleware.

### Controllers

Controllers handle HTTP details and delegate business logic to services. Responses are normalized through helpers in `src/utils/response.ts`.

### Services

Services implement core business rules:

- Slug uniqueness checks.
  -, Entity existence validation.
- Progress calculations.

### Repositories

Repositories encapsulate Knex queries and table access:

- Shared CRUD logic in `BaseRepository`.
- Resource-specific queries in concrete repositories.

## Validation

Request validation uses Zod DTOs in `src/dto/` and the `validate` middleware. Validation errors return a consistent error shape with field-level details.

## Error Handling

Errors are centralized in `src/middleware/error.middleware.ts`:

- `AppError` for operational errors.
- Specialized errors for 401/403/404/409/422.
- Zod errors are mapped to `VALIDATION_ERROR`.
- Unknown errors return `INTERNAL_ERROR`.

## Security

Admin access is enforced by `adminGuard`:

- Uses `X-Admin-Key`.
- In production, missing `ADMIN_API_KEY` blocks admin routes.
- In development, missing `ADMIN_API_KEY` logs a warning and allows access.

## Rate Limiting

`publicRateLimit` applies to all `/api/v1` routes.
`strictRateLimit` applies to write endpoints.

## Logging

Winston is configured in `src/logging/logger.ts`:

- Development: colorized console output.
- Production: JSON logs.
  Request logs include method, path, status, duration, and IP.

## Documentation

Swagger spec is generated in `src/swagger.ts` and exposed at `/api/docs`.
