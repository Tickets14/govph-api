import { Feedback } from '../../types/feedback.types';

export interface FeedbackFilters {
  type?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface IFeedbackRepository {
  findFiltered(filters?: FeedbackFilters): Promise<Feedback[]>;
  countFiltered(filters?: Omit<FeedbackFilters, 'limit' | 'offset'>): Promise<number>;
  findAll(limit?: number, offset?: number): Promise<Feedback[]>;
  findById(id: string): Promise<Feedback | undefined>;
  create(data: Partial<Feedback>): Promise<Feedback>;
  update(id: string, data: Partial<Feedback>): Promise<Feedback | undefined>;
  delete(id: string): Promise<boolean>;
}
