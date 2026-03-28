import swaggerJsdoc from 'swagger-jsdoc';
import { API_PREFIX } from './constants/common';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'govph-api',
      version: '1.0.0',
      description:
        'Philippine Government Services API — browse, search, and track progress on government transactions.',
    },
    servers: [{ url: API_PREFIX, description: 'Current version' }],
    components: {
      securitySchemes: {
        AdminKey: {
          type: 'apiKey',
          in: 'header',
          name: 'X-Admin-Key',
          description: 'Required for all admin (write) operations.',
        },
        UserId: {
          type: 'apiKey',
          in: 'header',
          name: 'X-User-Id',
          description: 'Required for all user progress operations.',
        },
      },
      schemas: {
        PaginationMeta: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 10 },
            page: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 20 },
            totalPages: { type: 'integer', example: 1 },
          },
        },
        Agency: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'National Bureau of Investigation' },
            acronym: { type: 'string', example: 'NBI' },
            description: { type: 'string' },
            website_url: { type: 'string', nullable: true },
            logo_url: { type: 'string', nullable: true },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Service: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            agency_id: { type: 'string', format: 'uuid' },
            name: { type: 'string', example: 'NBI Clearance' },
            slug: { type: 'string', example: 'nbi-clearance' },
            description: { type: 'string' },
            category: { type: 'string', nullable: true },
            estimated_time: { type: 'string', nullable: true },
            appointment_url: { type: 'string', nullable: true },
            is_active: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Requirement: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            step_id: { type: 'string', format: 'uuid' },
            service_id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            is_optional: { type: 'boolean' },
          },
        },
        Step: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            service_id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string', nullable: true },
            order: { type: 'integer' },
            requirements: { type: 'array', items: { $ref: '#/components/schemas/Requirement' } },
          },
        },
        ServiceDetail: {
          allOf: [
            { $ref: '#/components/schemas/Service' },
            {
              type: 'object',
              properties: {
                agency: { $ref: '#/components/schemas/Agency' },
                steps: { type: 'array', items: { $ref: '#/components/schemas/Step' } },
              },
            },
          ],
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                code: { type: 'string', example: 'NOT_FOUND' },
                message: { type: 'string', example: 'Resource not found' },
              },
            },
          },
        },
      },
    },
    tags: [
      { name: 'Health', description: 'Service health' },
      { name: 'Agencies', description: 'Government agency directory' },
      { name: 'Services', description: 'Government services' },
      { name: 'Steps', description: 'Service steps (standalone mutations)' },
      { name: 'Requirements', description: 'Step requirements (standalone mutations)' },
      { name: 'Progress', description: 'User progress tracking (X-User-Id required)' },
    ],
    paths: {
      '/health': {
        get: {
          tags: ['Health'],
          summary: 'Health check',
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', example: 'ok' },
                      version: { type: 'string', example: 'v1' },
                      timestamp: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/agencies': {
        get: {
          tags: ['Agencies'],
          summary: 'List all agencies (paginated, searchable)',
          parameters: [
            {
              name: 'search',
              in: 'query',
              description: 'Search across agency name, acronym, and description (case-insensitive)',
              schema: { type: 'string' },
            },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
          ],
          responses: {
            200: {
              description: 'Paginated agency list',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { type: 'array', items: { $ref: '#/components/schemas/Agency' } },
                      meta: { $ref: '#/components/schemas/PaginationMeta' },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Agencies'],
          summary: 'Create agency (admin)',
          security: [{ AdminKey: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'acronym', 'description'],
                  properties: {
                    name: { type: 'string' },
                    acronym: { type: 'string' },
                    description: { type: 'string' },
                    website_url: { type: 'string', nullable: true },
                    logo_url: { type: 'string', nullable: true },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Agency created' },
            401: {
              description: 'Unauthorized',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            409: { description: 'Acronym conflict' },
          },
        },
      },
      '/agencies/{acronym}': {
        get: {
          tags: ['Agencies'],
          summary: 'Get agency by acronym',
          parameters: [{ name: 'acronym', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Agency found' },
            404: {
              description: 'Not found',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
      },
      '/agencies/{id}': {
        put: {
          tags: ['Agencies'],
          summary: 'Update agency (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Agency' } } },
          },
          responses: {
            200: { description: 'Updated' },
            401: { description: 'Unauthorized' },
            404: { description: 'Not found' },
          },
        },
        delete: {
          tags: ['Agencies'],
          summary: 'Delete agency (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            204: { description: 'Deleted' },
            401: { description: 'Unauthorized' },
            404: { description: 'Not found' },
          },
        },
      },
      '/services': {
        get: {
          tags: ['Services'],
          summary: 'List services (paginated, filterable)',
          parameters: [
            {
              name: 'search',
              in: 'query',
              description: 'Full-text search across name, description, and agency name',
              schema: { type: 'string' },
            },
            {
              name: 'agency',
              in: 'query',
              description: 'Filter by agency acronym (e.g. "dfa", "nbi"). Cannot be combined with agency_id.',
              schema: { type: 'string', example: 'dfa' },
            },
            {
              name: 'agency_id',
              in: 'query',
              description: 'Filter by agency UUID. Cannot be combined with agency.',
              schema: { type: 'string', format: 'uuid' },
            },
            { name: 'is_active', in: 'query', schema: { type: 'string', enum: ['true', 'false'] } },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
          ],
          responses: {
            200: {
              description: 'Paginated service list',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { type: 'array', items: { $ref: '#/components/schemas/Service' } },
                      meta: { $ref: '#/components/schemas/PaginationMeta' },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Services'],
          summary: 'Create service (admin)',
          security: [{ AdminKey: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['agency_id', 'name', 'slug', 'description'],
                  properties: {
                    agency_id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    slug: { type: 'string' },
                    description: { type: 'string' },
                    category: { type: 'string', nullable: true },
                    estimated_time: { type: 'string', nullable: true },
                    appointment_url: { type: 'string', nullable: true },
                    is_active: { type: 'boolean' },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Service created' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/services/{slug}': {
        get: {
          tags: ['Services'],
          summary: 'Get service detail with steps and requirements',
          parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: {
              description: 'Service detail',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ServiceDetail' } } },
            },
            404: { description: 'Not found' },
          },
        },
      },
      '/services/{slug}/progress': {
        get: {
          tags: ['Services'],
          summary: 'Get service detail with user progress',
          security: [{ UserId: [] }],
          parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Service with progress merged into each step' },
            422: { description: 'Missing X-User-Id header' },
          },
        },
      },
      '/services/{id}': {
        put: {
          tags: ['Services'],
          summary: 'Update service (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Service' } } },
          },
          responses: {
            200: { description: 'Updated' },
            401: { description: 'Unauthorized' },
            404: { description: 'Not found' },
          },
        },
        delete: {
          tags: ['Services'],
          summary: 'Delete service (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: {
            204: { description: 'Deleted' },
            401: { description: 'Unauthorized' },
            404: { description: 'Not found' },
          },
        },
      },
      '/services/{serviceId}/steps': {
        post: {
          tags: ['Services'],
          summary: 'Add steps to service (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'serviceId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  minItems: 1,
                  items: {
                    type: 'object',
                    required: ['order', 'title'],
                    properties: {
                      order: { type: 'integer', example: 1 },
                      title: { type: 'string' },
                      description: { type: 'string', nullable: true },
                      is_optional: { type: 'boolean', default: false },
                    },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Steps created' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/services/{serviceId}/steps/reorder': {
        patch: {
          tags: ['Services'],
          summary: 'Reorder steps (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'serviceId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['step_ids'],
                  properties: {
                    step_ids: { type: 'array', items: { type: 'string', format: 'uuid' }, minItems: 1 },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Steps reordered' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/steps/{id}': {
        put: {
          tags: ['Steps'],
          summary: 'Update step (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Step' } } },
          },
          responses: { 200: { description: 'Updated' }, 401: { description: 'Unauthorized' } },
        },
        delete: {
          tags: ['Steps'],
          summary: 'Delete step (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { 204: { description: 'Deleted' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/steps/{stepId}/requirements': {
        post: {
          tags: ['Steps'],
          summary: 'Add requirement to step (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'stepId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string', nullable: true },
                    is_optional: { type: 'boolean', default: false },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Requirement created' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/requirements/{id}': {
        put: {
          tags: ['Requirements'],
          summary: 'Update requirement (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Requirement' } } },
          },
          responses: { 200: { description: 'Updated' }, 401: { description: 'Unauthorized' } },
        },
        delete: {
          tags: ['Requirements'],
          summary: 'Delete requirement (admin)',
          security: [{ AdminKey: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { 204: { description: 'Deleted' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/progress/{serviceId}': {
        get: {
          tags: ['Progress'],
          summary: 'Get user progress for a service',
          security: [{ UserId: [] }],
          parameters: [{ name: 'serviceId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { 200: { description: 'Progress records' }, 422: { description: 'Missing X-User-Id' } },
        },
        delete: {
          tags: ['Progress'],
          summary: 'Reset user progress for a service',
          security: [{ UserId: [] }],
          parameters: [{ name: 'serviceId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          responses: { 204: { description: 'Progress reset' }, 422: { description: 'Missing X-User-Id' } },
        },
      },
      '/progress/{serviceId}/toggle': {
        post: {
          tags: ['Progress'],
          summary: 'Toggle step completion',
          security: [{ UserId: [] }],
          parameters: [{ name: 'serviceId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['step_id'],
                  properties: { step_id: { type: 'string', format: 'uuid' } },
                },
              },
            },
          },
          responses: { 200: { description: 'Toggled' }, 422: { description: 'Missing X-User-Id or invalid step' } },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
