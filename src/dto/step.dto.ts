import { z } from 'zod';

const stepBodySchema = z.object({
  order: z.number({ required_error: 'order is required' }).int().positive(),
  title: z.string().min(1).max(255),
  description: z.string().nullable().optional(),
  is_optional: z.boolean().optional(),
});

export const CreateStepsDto = z.object({
  params: z.object({ serviceId: z.string().uuid('Must be a valid UUID') }),
  body: z.union([stepBodySchema, z.array(stepBodySchema).min(1, 'At least one step is required')]),
});

export const UpdateStepDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
  body: z
    .object({
      order: z.number().int().positive().optional(),
      title: z.string().min(1).max(255).optional(),
      description: z.string().nullable().optional(),
      is_optional: z.boolean().optional(),
    })
    .refine((b) => Object.keys(b).length > 0, { message: 'Body must not be empty' }),
});

export const ReorderStepsDto = z.object({
  params: z.object({ serviceId: z.string().uuid('Must be a valid UUID') }),
  body: z.object({
    step_ids: z.array(z.string().uuid('Each step ID must be a valid UUID')).min(1, 'At least one step ID is required'),
  }),
});

export const StepIdParamsDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
});

export type CreateStepsBody = z.infer<typeof CreateStepsDto>['body'];
export type CreateStepsParams = z.infer<typeof CreateStepsDto>['params'];
export type UpdateStepBody = z.infer<typeof UpdateStepDto>['body'];
export type UpdateStepParams = z.infer<typeof UpdateStepDto>['params'];
export type ReorderStepsBody = z.infer<typeof ReorderStepsDto>['body'];
export type ReorderStepsParams = z.infer<typeof ReorderStepsDto>['params'];
export type StepIdParams = z.infer<typeof StepIdParamsDto>['params'];
