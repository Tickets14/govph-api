export type FeedbackType = 'bug' | 'feature_request' | 'general';
export type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Feedback {
  id: string;
  type: FeedbackType;
  subject: string;
  description: string;
  email: string | null;
  status: FeedbackStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFeedbackInput {
  type: FeedbackType;
  subject: string;
  description: string;
  email?: string | null;
}

export interface UpdateFeedbackInput {
  status?: FeedbackStatus;
}
