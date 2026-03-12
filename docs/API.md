# API Guide

## Base URL
All endpoints are under:

`/api/v1`

Swagger UI:

`/api/docs`

## Authentication and Headers
Admin endpoints require:
- `X-Admin-Key`: value must match `ADMIN_API_KEY`.

Progress endpoints require:
- `X-User-Id`: a non-empty string identifying the user.

## Response Format
Success:
```json
{
  "success": true,
  "data": {},
  "message": "optional"
}
```

Errors:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {}
  }
}
```

## Pagination
List endpoints accept:
- `page`: 1-based page number.
- `limit`: page size.

Paginated responses include:
```json
{
  "success": true,
  "data": [],
  "meta": { "total": 0, "page": 1, "limit": 20, "totalPages": 0 }
}
```

## Endpoints
| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | Public | Health check |
| GET | `/agencies` | Public | List agencies (paginated) |
| GET | `/agencies/:slug` | Public | Get agency by slug |
| POST | `/agencies` | Admin | Create agency |
| PUT | `/agencies/:id` | Admin | Update agency |
| DELETE | `/agencies/:id` | Admin | Delete agency |
| GET | `/services` | Public | List services (filterable, paginated) |
| GET | `/services/:slug` | Public | Service detail with steps and requirements |
| GET | `/services/:slug/progress` | `X-User-Id` | Service detail with progress merged |
| POST | `/services` | Admin | Create service |
| PUT | `/services/:id` | Admin | Update service |
| DELETE | `/services/:id` | Admin | Delete service |
| POST | `/services/:serviceId/steps` | Admin | Add step to service |
| PATCH | `/services/:serviceId/steps/reorder` | Admin | Reorder steps |
| PUT | `/steps/:id` | Admin | Update step |
| DELETE | `/steps/:id` | Admin | Delete step |
| POST | `/steps/:stepId/requirements` | Admin | Add requirement to step |
| PUT | `/requirements/:id` | Admin | Update requirement |
| DELETE | `/requirements/:id` | Admin | Delete requirement |
| GET | `/progress/:serviceId` | `X-User-Id` | Get progress summary |
| POST | `/progress/:serviceId/toggle` | `X-User-Id` | Toggle step completion |
| DELETE | `/progress/:serviceId` | `X-User-Id` | Reset progress for a service |

## Query Parameters
`GET /services`:
- `search`: full-text search across name, description, and agency name.
- `agency_id`: filter by agency UUID.
- `is_active`: `true` or `false`.
- `page`, `limit`: pagination.

`GET /agencies`:
- `page`, `limit`: pagination.

## Example Requests
List services:
```bash
curl "http://localhost:3000/api/v1/services?page=1&limit=20"
```

Create a service (admin):
```bash
curl -X POST "http://localhost:3000/api/v1/services" ^
  -H "Content-Type: application/json" ^
  -H "X-Admin-Key: your-admin-key" ^
  -d "{\"agency_id\":\"<uuid>\",\"name\":\"NBI Clearance\",\"slug\":\"nbi-clearance\",\"description\":\"...\"}"
```

Toggle progress:
```bash
curl -X POST "http://localhost:3000/api/v1/progress/<serviceId>/toggle" ^
  -H "Content-Type: application/json" ^
  -H "X-User-Id: user-123" ^
  -d "{\"step_id\":\"<uuid>\"}"
```
