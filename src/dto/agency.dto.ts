import { z } from 'zod';

const slugRule = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens only');

export const CreateAgencyDto = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    slug: slugRule,
    website_url: z.string().url('Must be a valid URL').nullable().optional(),
    logo_url: z.string().url('Must be a valid URL').nullable().optional(),
  }),
});

export const UpdateAgencyDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
  body: z
    .object({
      name: z.string().min(1).max(255).optional(),
      slug: slugRule.optional(),
      website_url: z.string().url().nullable().optional(),
      logo_url: z.string().url().nullable().optional(),
    })
    .refine((b) => Object.keys(b).length > 0, { message: 'Body must not be empty' }),
});

export const AgencyIdParamsDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
});

export const AgencySlugParamsDto = z.object({
  params: z.object({ slug: z.string().min(1).max(100) }),
});

export const AgencyFilterDto = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});

export type CreateAgencyBody = z.infer<typeof CreateAgencyDto>['body'];
export type UpdateAgencyBody = z.infer<typeof UpdateAgencyDto>['body'];
export type AgencyFilterQuery = z.infer<typeof AgencyFilterDto>['query'];
export type AgencyIdParams = z.infer<typeof AgencyIdParamsDto>['params'];
export type AgencySlugParams = z.infer<typeof AgencySlugParamsDto>['params'];
