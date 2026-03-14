# API Guide

## Base URL
All endpoints are under:

`/api/v1`

Swagger UI:

`/api/docs`

## Authentication and Headers
Admin endpoints require header:
`X-Admin-Key: <ADMIN_API_KEY>`

Progress endpoints require header:
`X-User-Id: <any-non-empty-string>`

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
- `page`: 1-based page number
- `limit`: page size

Paginated responses include:
```json
{
  "success": true,
  "data": [],
  "meta": { "total": 0, "page": 1, "limit": 20, "totalPages": 0 }
}
```

## Note on curl quoting (PowerShell)
The samples below use single quotes around JSON bodies so they work in PowerShell. If you use CMD, adjust quotes accordingly.

## Endpoints and Sample curl

### Health
`GET /health`
```bash
curl "http://localhost:3000/api/v1/health"
```

### Agencies
`GET /agencies`
```bash
curl "http://localhost:3000/api/v1/agencies?page=1&limit=20"
```

`GET /agencies/:slug`
```bash
curl "http://localhost:3000/api/v1/agencies/dti"
```

`POST /agencies` (admin)
```bash
curl -X POST "http://localhost:3000/api/v1/agencies" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"name":"Department of Trade and Industry","slug":"dti","website_url":"https://www.dti.gov.ph","logo_url":"https://example.com/logo.png"}'
```

`PUT /agencies/:id` (admin)
```bash
curl -X PUT "http://localhost:3000/api/v1/agencies/<uuid>" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"name":"DTI Updated"}'
```

`DELETE /agencies/:id` (admin)
```bash
curl -X DELETE "http://localhost:3000/api/v1/agencies/<uuid>" -H "X-Admin-Key: <ADMIN_API_KEY>"
```

### Services
`GET /services`
```bash
curl "http://localhost:3000/api/v1/services?page=1&limit=20"
```

`GET /services` (with filters)
```bash
curl "http://localhost:3000/api/v1/services?search=clearance&is_active=true&agency_id=<agencyUuid>&page=1&limit=20"
```

`GET /services/:slug`
```bash
curl "http://localhost:3000/api/v1/services/nbi-clearance"
```

`GET /services/:slug/progress` (X-User-Id)
```bash
curl "http://localhost:3000/api/v1/services/nbi-clearance/progress" -H "X-User-Id: user-123"
```

`POST /services` (admin)
```bash
curl -X POST "http://localhost:3000/api/v1/services" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"agency_id":"<agencyUuid>","name":"NBI Clearance","slug":"nbi-clearance","description":"...","estimated_time":"2 weeks","appointment_url":"https://example.com","is_active":true}'
```

`PUT /services/:id` (admin)
```bash
curl -X PUT "http://localhost:3000/api/v1/services/<uuid>" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"description":"Updated description"}'
```

`DELETE /services/:id` (admin)
```bash
curl -X DELETE "http://localhost:3000/api/v1/services/<uuid>" -H "X-Admin-Key: <ADMIN_API_KEY>"
```

### Steps
`POST /services/:serviceId/steps` (admin)
```bash
curl -X POST "http://localhost:3000/api/v1/services/<serviceId>/steps" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"order":1,"title":"Submit application","description":"...","is_optional":false}'
```

`PATCH /services/:serviceId/steps/reorder` (admin)
```bash
curl -X PATCH "http://localhost:3000/api/v1/services/<serviceId>/steps/reorder" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"step_ids":["<stepId1>","<stepId2>"]}'
```

`PUT /steps/:id` (admin)
```bash
curl -X PUT "http://localhost:3000/api/v1/steps/<stepId>" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"title":"Updated step title"}'
```

`DELETE /steps/:id` (admin)
```bash
curl -X DELETE "http://localhost:3000/api/v1/steps/<stepId>" -H "X-Admin-Key: <ADMIN_API_KEY>"
```

### Requirements
`POST /steps/:stepId/requirements` (admin)
```bash
curl -X POST "http://localhost:3000/api/v1/steps/<stepId>/requirements" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"service_id":"<serviceId>","name":"Valid ID","description":"...","is_optional":false,"notes":"Original + photocopy"}'
```

`PUT /requirements/:id` (admin)
```bash
curl -X PUT "http://localhost:3000/api/v1/requirements/<requirementId>" -H "Content-Type: application/json" -H "X-Admin-Key: <ADMIN_API_KEY>" -d '{"notes":"Updated notes"}'
```

`DELETE /requirements/:id` (admin)
```bash
curl -X DELETE "http://localhost:3000/api/v1/requirements/<requirementId>" -H "X-Admin-Key: <ADMIN_API_KEY>"
```

### Progress
`GET /progress/:serviceId` (X-User-Id)
```bash
curl "http://localhost:3000/api/v1/progress/<serviceId>" -H "X-User-Id: user-123"
```

`POST /progress/:serviceId/toggle` (X-User-Id)
```bash
curl -X POST "http://localhost:3000/api/v1/progress/<serviceId>/toggle" -H "Content-Type: application/json" -H "X-User-Id: user-123" -d '{"step_id":"<stepId>"}'
```

`DELETE /progress/:serviceId` (X-User-Id)
```bash
curl -X DELETE "http://localhost:3000/api/v1/progress/<serviceId>" -H "X-User-Id: user-123"
```
