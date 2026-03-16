import { Router } from 'express';
import { AgencyController } from '../controllers/agency.controller';
import { adminGuard } from '../middleware/admin-guard.middleware';
import { strictRateLimit } from '../middleware/rate-limit.middleware';
import {
  validateAgencyFilter,
  validateAgencyIdParams,
  validateAgencyAcronymParams,
  validateCreateAgency,
  validateUpdateAgency,
} from '../validators/agency.validator';

/**
 * Mounted at /agencies
 *
 * Public
 *   GET  /           → list all agencies
 *   GET  /:acronym       → get agency by acronym
 *
 * Admin  (requires X-Admin-Key header)
 *   POST   /          → create
 *   PUT    /:id        → update
 *   DELETE /:id        → delete
 */
export function agencyRoutes(controller: AgencyController): Router {
  const router = Router();

  // ── Public ────────────────────────────────────────────────────────────────
  router.get('/', validateAgencyFilter, controller.getAll);
  router.get('/:acronym', validateAgencyAcronymParams, controller.getByAcronym);

  // ── Admin ─────────────────────────────────────────────────────────────────
  router.post('/', strictRateLimit, adminGuard, validateCreateAgency, controller.create);
  router.put('/:id', strictRateLimit, adminGuard, validateUpdateAgency, controller.update);
  router.delete('/:id', strictRateLimit, adminGuard, validateAgencyIdParams, controller.delete);

  return router;
}
