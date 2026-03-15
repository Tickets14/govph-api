import { z } from 'zod';

export const CreateRequirementDto = z.object({
  params: z.object({ stepId: z.string().uuid('Must be a valid UUID') }),
  body: z.object({
    service_id: z.string().uuid('Must be a valid UUID'),
    name: z.string().min(1).max(255),
    description: z.string().nullable().optional(),
    is_optional: z.boolean().optional(),
    notes: z.string().nullable().optional(),
  }),
});

export const UpdateRequirementDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
  body: z
    .object({
      name: z.string().min(1).max(255).optional(),
      description: z.string().nullable().optional(),
      is_optional: z.boolean().optional(),
      notes: z.string().nullable().optional(),
    })
    .refine((b) => Object.keys(b).length > 0, { message: 'Body must not be empty' }),
});

export const RequirementIdParamsDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
});

export type CreateRequirementBody = z.infer<typeof CreateRequirementDto>['body'];
export type CreateRequirementParams = z.infer<typeof CreateRequirementDto>['params'];
export type UpdateRequirementBody = z.infer<typeof UpdateRequirementDto>['body'];
export type UpdateRequirementParams = z.infer<typeof UpdateRequirementDto>['params'];
export type RequirementIdParams = z.infer<typeof RequirementIdParamsDto>['params'];
