import { z } from 'zod';

export const ToggleProgressDto = z.object({
  params: z.object({ serviceId: z.string().uuid('Must be a valid UUID') }),
  body: z.object({
    step_id: z.string().uuid('Must be a valid UUID'),
  }),
});

export const ProgressServiceParamsDto = z.object({
  params: z.object({ serviceId: z.string().uuid('Must be a valid UUID') }),
});

export type ToggleProgressBody   = z.infer<typeof ToggleProgressDto>['body'];
export type ToggleProgressParams = z.infer<typeof ToggleProgressDto>['params'];
export type ProgressServiceParams = z.infer<typeof ProgressServiceParamsDto>['params'];
