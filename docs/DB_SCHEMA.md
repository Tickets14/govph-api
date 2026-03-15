# Database Schema

The schema is managed with Knex migrations in `database/migrations/`.

## Tables

### `agencies`

| Column        | Type        | Notes            |
| ------------- | ----------- | ---------------- |
| `id`          | uuid        | Primary key      |
| `name`        | string(255) | Required         |
| `slug`        | string(100) | Unique, required |
| `website_url` | string(512) | Nullable         |
| `logo_url`    | string(512) | Nullable         |
| `created_at`  | timestamp   | Auto-managed     |
| `updated_at`  | timestamp   | Auto-managed     |

### `services`

| Column            | Type        | Notes               |
| ----------------- | ----------- | ------------------- |
| `id`              | uuid        | Primary key         |
| `agency_id`       | uuid        | FK to `agencies.id` |
| `name`            | string(255) | Required            |
| `slug`            | string(100) | Unique, required    |
| `description`     | text        | Required            |
| `estimated_time`  | string(100) | Nullable            |
| `appointment_url` | string(512) | Nullable            |
| `is_active`       | boolean     | Default `true`      |
| `created_at`      | timestamp   | Auto-managed        |
| `updated_at`      | timestamp   | Auto-managed        |

Indexes:

- `agency_id`
- `is_active`

### `steps`

| Column        | Type        | Notes                        |
| ------------- | ----------- | ---------------------------- |
| `id`          | uuid        | Primary key                  |
| `service_id`  | uuid        | FK to `services.id`          |
| `order`       | integer     | Required, unique per service |
| `title`       | string(255) | Required                     |
| `description` | text        | Nullable                     |
| `is_optional` | boolean     | Default `false`              |
| `created_at`  | timestamp   | Auto-managed                 |
| `updated_at`  | timestamp   | Auto-managed                 |

Constraints:

- Unique (`service_id`, `order`)

Indexes:

- `service_id`

### `requirements`

| Column        | Type        | Notes               |
| ------------- | ----------- | ------------------- |
| `id`          | uuid        | Primary key         |
| `step_id`     | uuid        | FK to `steps.id`    |
| `service_id`  | uuid        | FK to `services.id` |
| `name`        | string(255) | Required            |
| `description` | text        | Nullable            |
| `is_optional` | boolean     | Default `false`     |
| `notes`       | text        | Nullable            |
| `created_at`  | timestamp   | Auto-managed        |
| `updated_at`  | timestamp   | Auto-managed        |

Indexes:

- `step_id`
- `service_id`

### `user_progress`

| Column         | Type        | Notes               |
| -------------- | ----------- | ------------------- |
| `id`           | uuid        | Primary key         |
| `user_id`      | string(255) | Required            |
| `service_id`   | uuid        | FK to `services.id` |
| `step_id`      | uuid        | FK to `steps.id`    |
| `is_completed` | boolean     | Default `false`     |
| `completed_at` | timestamp   | Nullable            |

Constraints:

- Unique (`user_id`, `service_id`, `step_id`)

Indexes:

- `user_id`
- (`user_id`, `service_id`)

## Relationships

- An agency has many services.
- A service has many steps.
- A step has many requirements.
- Requirements also reference service for direct filtering.
- User progress is tracked per user + service + step.
