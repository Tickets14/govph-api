import { Router } from 'express';
import { RequirementController } from '../controllers/requirement.controller';
import { adminGuard } from '../middleware/admin-guard.middleware';
import { strictRateLimit } from '../middleware/rate-limit.middleware';
import {
  validateRequirementIdParams,
  validateUpdateRequirement,
} from '../validators/requirement.validator';

/**
 * Mounted at /requirements
 *
 * Admin
 *   PUT    /:id  → update requirement
 *   DELETE /:id  → delete requirement
 */
export function requirementRoutes(controller: RequirementController): Router {
  const router = Router();

  router.put('/:id', strictRateLimit, adminGuard, validateUpdateRequirement, controller.update);
  router.delete('/:id', strictRateLimit, adminGuard, validateRequirementIdParams, controller.delete);

  return router;
}
