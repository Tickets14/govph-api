import { Request, Response, NextFunction } from 'express';
import { RequirementService } from '../services/requirement.service';
import { HTTP_STATUS } from '../constants/common';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/response';
import { CreateRequirementBody, UpdateRequirementBody } from '../dto/requirement.dto';

export class RequirementController {
  constructor(private readonly service: RequirementService) {}

  /**
   * POST /steps/:stepId/requirements
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stepId = String(req.params['stepId']);
      const requirement = await this.service.create({
        step_id: stepId,
        ...(req.body as CreateRequirementBody),
      });
      sendCreated(res, requirement, 'Requirement created');
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /requirements/:id
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requirement = await this.service.update(String(req.params['id']), req.body as UpdateRequirementBody);
      sendSuccess(res, requirement, 'Requirement updated', HTTP_STATUS.OK);
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /requirements/:id
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
