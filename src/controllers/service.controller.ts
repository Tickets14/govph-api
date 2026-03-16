import { Request, Response, NextFunction } from 'express';
import { ServiceService } from '../services/service.service';
import { HTTP_STATUS } from '../constants/common';
import { sendSuccess, sendCreated, sendNoContent, sendPaginated } from '../utils/response';
import { getUserId } from '../utils/headers';
import { CreateServiceBody, UpdateServiceBody, ServiceFilterQuery } from '../dto/service.dto';

export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  /**
   * GET /services
   * Supports ?agency_id=&is_active=true|false&search=&page=&limit=
   */
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { agency_id, agency, is_active, search } = req.query as ServiceFilterQuery;
      const result = await this.service.getAllServices(
        {
          agency_id,
          agency_acronym: agency,
          is_active: is_active !== undefined ? is_active === 'true' : undefined,
          search,
        },
        req.query
      );
      sendPaginated(res, result);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /services/:slug
   * Full detail — includes nested steps and their requirements.
   */
  getBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const service = await this.service.getServiceBySlug(String(req.params['slug']));
      sendSuccess(res, service);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /services/:slug/progress
   * Merges user progress into each step.
   * Requires X-User-Id header.
   */
  getWithProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const service = await this.service.getServiceWithProgress(String(req.params['slug']), userId);
      sendSuccess(res, service);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /services
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const svc = await this.service.createService(req.body as CreateServiceBody);
      sendCreated(res, svc, 'Service created');
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /services/:id
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const svc = await this.service.updateService(String(req.params['id']), req.body as UpdateServiceBody);
      sendSuccess(res, svc, 'Service updated', HTTP_STATUS.OK);
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /services/:id
   */
  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.deleteService(String(req.params['id']));
      sendNoContent(res);
    } catch (err) {
      next(err);
    }
  };
}
