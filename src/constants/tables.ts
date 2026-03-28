export const TABLES = {
  AGENCIES: 'agencies',
  SERVICES: 'services',
  STEPS: 'steps',
  REQUIREMENTS: 'requirements',
  USER_PROGRESS: 'user_progress',
  FEEDBACKS: 'feedbacks',
} as const;

export type TableName = (typeof TABLES)[keyof typeof TABLES];
