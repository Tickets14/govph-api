import { z } from 'zod';

const slugRule = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens only');

const acronymRule = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[A-Za-z0-9-]+$/, 'Acronym must be alphanumeric with optional hyphens');

export const CreateServiceDto = z.object({
  body: z.object({
    agency_id: z.string().uuid('Must be a valid UUID'),
    name: z.string().min(1).max(255),
    slug: slugRule,
    description: z.string().min(1),
    category: z.string().max(100).nullable().optional(),
    estimated_time: z.string().max(100).nullable().optional(),
    appointment_url: z.string().url().nullable().optional(),
    is_active: z.boolean().optional(),
  }),
});

export const UpdateServiceDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
  body: z
    .object({
      agency_id: z.string().uuid().optional(),
      name: z.string().min(1).max(255).optional(),
      slug: slugRule.optional(),
      description: z.string().min(1).optional(),
      category: z.string().max(100).nullable().optional(),
      estimated_time: z.string().max(100).nullable().optional(),
      appointment_url: z.string().url().nullable().optional(),
      is_active: z.boolean().optional(),
    })
    .refine((b) => Object.keys(b).length > 0, { message: 'Body must not be empty' }),
});

export const ServiceFilterDto = z.object({
  query: z.object({
    agency_id: z.string().uuid().optional(),
    agency: acronymRule.optional(), // acronym-based agency filter, e.g. ?agency=dfa
    is_active: z.enum(['true', 'false']).optional(),
    search: z.string().min(1).max(100).optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});

export const ServiceIdParamsDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
});

export const ServiceSlugParamsDto = z.object({
  params: z.object({ slug: z.string().min(1).max(100) }),
});

export type CreateServiceBody = z.infer<typeof CreateServiceDto>['body'];
export type UpdateServiceBody = z.infer<typeof UpdateServiceDto>['body'];
export type ServiceFilterQuery = z.infer<typeof ServiceFilterDto>['query'];
export type ServiceIdParams = z.infer<typeof ServiceIdParamsDto>['params'];
export type ServiceSlugParams = z.infer<typeof ServiceSlugParamsDto>['params'];
