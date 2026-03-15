import { Router } from 'express';
import { StepController } from '../controllers/step.controller';
import { RequirementController } from '../controllers/requirement.controller';
import { adminGuard } from '../middleware/admin-guard.middleware';
import { strictRateLimit } from '../middleware/rate-limit.middleware';
import { validateUpdateStep, validateStepIdParams } from '../validators/step.validator';
import { validateCreateRequirement } from '../validators/requirement.validator';

/**
 * Mounted at /steps
 *
 * Admin
 *   PUT    /:id                   → update step
 *   DELETE /:id                   → delete step
 *   POST   /:stepId/requirements  → create requirement under step
 */
export function stepRoutes(stepController: StepController, requirementController: RequirementController): Router {
  const router = Router();

  router.put('/:id', strictRateLimit, adminGuard, validateUpdateStep, stepController.update);
  router.delete('/:id', strictRateLimit, adminGuard, validateStepIdParams, stepController.delete);

  // Nested requirement creation
  router.post(
    '/:stepId/requirements',
    strictRateLimit,
    adminGuard,
    validateCreateRequirement,
    requirementController.create
  );

  return router;
}
