import { Request, Response, NextFunction } from 'express';
import { ProgressService } from '../services/progress.service';
import { sendSuccess, sendNoContent } from '../utils/response';
import { getUserId } from '../utils/headers';
import { ToggleProgressBody } from '../dto/progress.dto';

export class ProgressController {
  constructor(private readonly service: ProgressService) {}

  /**
   * GET /progress/:serviceId
   * Returns progress summary for the authenticated user on a service.
   * Requires X-User-Id header.
   */
  getProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const serviceId = String(req.params['serviceId']);
      const summary = await this.service.getProgress(userId, serviceId);
      sendSuccess(res, summary);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /progress/:serviceId/toggle
   * Toggles the completed state for a given step.
   * Body: { step_id }
   * Requires X-User-Id header.
   */
  toggleStep = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const serviceId = String(req.params['serviceId']);
      const { step_id } = req.body as ToggleProgressBody;
      const record = await this.service.toggleStep(userId, serviceId, step_id);
      sendSuccess(res, record);
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /progress/:serviceId
   * Resets all step progress for the user on a service.
   * Requires X-User-Id header.
   */
  resetProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const serviceId = String(req.params['serviceId']);
      await this.service.resetProgress(userId, serviceId);
      sendNoContent(res);
    } catch (err) {
      next(err);
    }
  };
}
