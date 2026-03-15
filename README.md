# GOVPH API

Philippine Government Services API for browsing agencies and services, plus tracking user progress through service steps. Built with Express + TypeScript and backed by PostgreSQL.

## Highlights

- REST API with versioned base path `/api/v1`
- Public read endpoints and admin-only write endpoints
- User progress tracking via `X-User-Id`
- Swagger UI at `/api/docs`
- Validation with Zod and structured error responses

## Quick Start

```bash
npm install
copy .env.example .env
npm run migrate
npm run seed
npm run dev
```

## Documentation

- `DOCUMENTATION.md` (full project reference)
- `docs/API.md` (API usage and examples)
- `docs/DB_SCHEMA.md` (database schema details)
- `docs/ARCHITECTURE.md` (system design and request flow)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run migrate
npm run seed
npm run test
```

## Environment

All environment variables are documented in `.env.example`.

## Swagger UI

By default, Swagger UI is served at `http://localhost:3000/api/docs`.
