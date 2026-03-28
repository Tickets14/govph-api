import { Request, Response, NextFunction } from 'express';
import { FeedbackService } from '../services/feedback.service';
import { HTTP_STATUS } from '../constants/common';
import { sendSuccess, sendCreated, sendNoContent, sendPaginated } from '../utils/response';
import { FeedbackFilterQuery, CreateFeedbackBody, UpdateFeedbackBody } from '../dto/feedback.dto';

export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}

  /**
   * GET /feedbacks
   * Returns all feedbacks with pagination and optional filters.
   */
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { search, type, status } = req.query as FeedbackFilterQuery;
      const result = await this.service.getAllFeedbacks({ search, type, status }, req.query);
      sendPaginated(res, result);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /feedbacks/:id
   * Returns a single feedback by ID.
   */
  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const feedback = await this.service.getFeedbackById(String(req.params['id']));
      sendSuccess(res, feedback);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /feedbacks
   * Creates a new feedback entry (public).
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const feedback = await this.service.createFeedback(req.body as CreateFeedbackBody);
      sendCreated(res, feedback, 'Feedback submitted successfully');
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /feedbacks/:id
   * Updates feedback status (admin).
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const feedback = await this.service.updateFeedback(String(req.params['id']), req.body as UpdateFeedbackBody);
      sendSuccess(res, feedback, 'Feedback updated', HTTP_STATUS.OK);
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /feedbacks/:id
   * Deletes a feedback entry (admin).
   */
  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.deleteFeedback(String(req.params['id']));
      sendNoContent(res);
    } catch (err) {
      next(err);
    }
  };
}
