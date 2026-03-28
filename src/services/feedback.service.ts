import { Feedback, CreateFeedbackInput, UpdateFeedbackInput } from '../types/feedback.types';
import { FeedbackRepository } from '../repositories/feedback.repository';
import { FeedbackFilters } from '../repositories/interfaces/feedback.repository.interface';
import { PaginatedResponse } from '../types/common.types';
import { parsePagination } from '../utils/pagination';
import { generateId } from '../utils/uuid';
import { NotFoundError, ValidationError } from '../middleware/error.middleware';
import { ErrorCode } from '../constants/error-codes';
import { EmailService } from './email.service';

export class FeedbackService {
  constructor(
    private readonly repo: FeedbackRepository,
    private readonly emailService: EmailService
  ) {}

  async getAllFeedbacks(
    filters?: Omit<FeedbackFilters, 'limit' | 'offset'>,
    paginationQuery: { page?: unknown; limit?: unknown } = {}
  ): Promise<PaginatedResponse<Feedback>> {
    const { page, limit, offset } = parsePagination(paginationQuery);
    const [data, total] = await Promise.all([
      this.repo.findFiltered({ ...filters, limit, offset }),
      this.repo.countFiltered(filters),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getFeedbackById(id: string): Promise<Feedback> {
    const feedback = await this.repo.findById(id);
    if (!feedback) throw new NotFoundError(`Feedback '${id}' not found`, ErrorCode.FEEDBACK_NOT_FOUND);
    return feedback;
  }

  async createFeedback(dto: CreateFeedbackInput): Promise<Feedback> {
    const feedback = await this.repo.create({
      id: generateId(),
      ...dto,
      email: dto.email ?? null,
      status: 'open',
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.emailService.sendFeedbackNotification(feedback.type, feedback.subject, feedback.description, feedback.email);

    return feedback;
  }

  async updateFeedback(id: string, dto: UpdateFeedbackInput): Promise<Feedback> {
    const feedback = await this.repo.findById(id);
    if (!feedback) throw new NotFoundError(`Feedback '${id}' not found`, ErrorCode.FEEDBACK_NOT_FOUND);
    return (await this.repo.update(id, dto))!;
  }

  async replyToFeedback(id: string, message: string, email: string): Promise<void> {
    const feedback = await this.repo.findById(id);
    if (!feedback) throw new NotFoundError(`Feedback '${id}' not found`, ErrorCode.FEEDBACK_NOT_FOUND);

    const sent = await this.emailService.sendFeedbackReply(email, feedback.subject, message);
    if (!sent) {
      throw new ValidationError('Failed to send reply email');
    }
  }

  async deleteFeedback(id: string): Promise<void> {
    const feedback = await this.repo.findById(id);
    if (!feedback) throw new NotFoundError(`Feedback '${id}' not found`, ErrorCode.FEEDBACK_NOT_FOUND);
    await this.repo.delete(id);
  }
}
