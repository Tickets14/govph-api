import { Request, Response, NextFunction } from 'express';
import { StepService } from '../services/step.service';
import { HTTP_STATUS } from '../constants/common';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/response';
import { CreateStepsBody, UpdateStepBody, ReorderStepsBody } from '../dto/step.dto';

export class StepController {
  constructor(private readonly service: StepService) {}

  /**
   * POST /services/:serviceId/steps
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const serviceId = String(req.params['serviceId']);
      const payload = req.body as CreateStepsBody;
      const stepsInput = Array.isArray(payload) ? payload : [payload];
      const steps = await this.service.createMany(serviceId, stepsInput);
      sendCreated(res, steps, 'Steps created');
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /steps/:id
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const step = await this.service.update(String(req.params['id']), req.body as UpdateStepBody);
      sendSuccess(res, step, 'Step updated', HTTP_STATUS.OK);
    } catch (err) {
      next(err);
    }
  };

  /**
   * PATCH /services/:serviceId/steps/reorder
   * Body: { step_ids: string[] }
   */
  reorder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const serviceId = String(req.params['serviceId']);
      const { step_ids } = req.body as ReorderStepsBody;
      const steps = await this.service.reorder(serviceId, step_ids);
      sendSuccess(res, steps, 'Steps reordered');
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /steps/:id
   */
  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.delete(String(req.params['id']));
      sendNoContent(res);
    } catch (err) {
      next(err);
    }
  };
}
