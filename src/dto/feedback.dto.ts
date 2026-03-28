import { z } from 'zod';

const feedbackTypeEnum = z.enum(['bug', 'feature_request', 'general']);
const feedbackStatusEnum = z.enum(['open', 'in_progress', 'resolved', 'closed']);

export const CreateFeedbackDto = z.object({
  body: z.object({
    type: feedbackTypeEnum,
    subject: z.string().min(1, 'Subject is required').max(255),
    description: z.string().min(1, 'Description is required').max(5000),
    email: z.string().email('Must be a valid email').nullable().optional(),
  }),
});

export const UpdateFeedbackDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
  body: z
    .object({
      status: feedbackStatusEnum.optional(),
    })
    .refine((b) => Object.keys(b).length > 0, { message: 'Body must not be empty' }),
});

export const FeedbackIdParamsDto = z.object({
  params: z.object({ id: z.string().uuid('Must be a valid UUID') }),
});

export const FeedbackFilterDto = z.object({
  query: z.object({
    search: z.string().min(1).max(100).optional(),
    type: feedbackTypeEnum.optional(),
    status: feedbackStatusEnum.optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});

export type CreateFeedbackBody = z.infer<typeof CreateFeedbackDto>['body'];
export type UpdateFeedbackBody = z.infer<typeof UpdateFeedbackDto>['body'];
export type FeedbackFilterQuery = z.infer<typeof FeedbackFilterDto>['query'];
export type FeedbackIdParams = z.infer<typeof FeedbackIdParamsDto>['params'];
