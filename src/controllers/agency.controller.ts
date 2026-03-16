import { Request, Response, NextFunction } from 'express';
import { AgencyService } from '../services/agency.service';
import { HTTP_STATUS } from '../constants/common';
import { sendSuccess, sendCreated, sendNoContent, sendPaginated } from '../utils/response';
import { AgencyFilterQuery, CreateAgencyBody, UpdateAgencyBody } from '../dto/agency.dto';

export class AgencyController {
  constructor(private readonly service: AgencyService) {}

  /**
   * GET /agencies
   * Returns all agencies ordered by name.
   */
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.service.getAllAgencies(req.query as AgencyFilterQuery);
      sendPaginated(res, result);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /agencies/:acronym
   * Returns a single agency by its acronym.
   */
  getByAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const agency = await this.service.getAgencyByAcronym(String(req.params['acronym']));
      sendSuccess(res, agency);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /agencies
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const agency = await this.service.createAgency(req.body as CreateAgencyBody);
      sendCreated(res, agency, 'Agency created');
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /agencies/:id
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const agency = await this.service.updateAgency(String(req.params['id']), req.body as UpdateAgencyBody);
      sendSuccess(res, agency, 'Agency updated', HTTP_STATUS.OK);
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /agencies/:id
   */
  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.deleteAgency(String(req.params['id']));
      sendNoContent(res);
    } catch (err) {
      next(err);
    }
  };
}
