import { z } from 'zod';

const acronymRule = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[A-Za-z0-9-]+$/, 'Acronym must be alphanumeric with optional hyphens');

export const CreateAgencyDto = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    acronym: acronymRule,
    description: z.string().min(1),
    website_url: z.string().url('Must be a valid URL').nullable().optional(),
    logo_url: z.string().url('Must be a valid URL').nullable().optional(),
  }),
});

export const UpdateAgencyDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
  body: z
    .object({
      name: z.string().min(1).max(255).optional(),
      acronym: acronymRule.optional(),
      description: z.string().min(1).optional(),
      website_url: z.string().url().nullable().optional(),
      logo_url: z.string().url().nullable().optional(),
    })
    .refine((b) => Object.keys(b).length > 0, { message: 'Body must not be empty' }),
});

export const AgencyIdParamsDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
});

export const AgencyAcronymParamsDto = z.object({
  params: z.object({ acronym: acronymRule }),
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
export type AgencyAcronymParams = z.infer<typeof AgencyAcronymParamsDto>['params'];
