import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { StepController } from '../controllers/step.controller';
import { adminGuard } from '../middleware/admin-guard.middleware';
import { strictRateLimit } from '../middleware/rate-limit.middleware';
import {
  validateCreateService,
  validateServiceFilter,
  validateServiceIdParams,
  validateServiceSlugParams,
  validateUpdateService,
} from '../validators/service.validator';
import { validateCreateStep, validateReorderSteps } from '../validators/step.validator';

/**
 * Mounted at /services
 *
 * Public
 *   GET  /                         → list (filterable)
 *   GET  /:slug/progress            → detail + user progress  (X-User-Id)
 *   GET  /:slug                     → full detail with steps + requirements
 *
 * Admin
 *   POST   /                        → create service
 *   PUT    /:id                     → update service
 *   DELETE /:id                     → delete service
 *   POST   /:serviceId/steps        → add step to service
 *   PATCH  /:serviceId/steps/reorder → reorder steps
 */
export function serviceRoutes(serviceController: ServiceController, stepController: StepController): Router {
  const router = Router();

  // ── Public ────────────────────────────────────────────────────────────────
  router.get('/', validateServiceFilter, serviceController.getAll);

  // NOTE: /progress and /steps/reorder must be registered BEFORE /:slug / /:id
  // to prevent Express from treating "progress" or "steps" as a slug/id value.
  router.get('/:slug/progress', validateServiceSlugParams, serviceController.getWithProgress);
  router.get('/:slug', validateServiceSlugParams, serviceController.getBySlug);

  // ── Admin ─────────────────────────────────────────────────────────────────
  router.post('/', strictRateLimit, adminGuard, validateCreateService, serviceController.create);
  router.put('/:id', strictRateLimit, adminGuard, validateUpdateService, serviceController.update);
  router.delete('/:id', strictRateLimit, adminGuard, validateServiceIdParams, serviceController.delete);

  // Nested step mutations — admin only
  router.post('/:serviceId/steps', strictRateLimit, adminGuard, validateCreateStep, stepController.create);
  router.patch('/:serviceId/steps/reorder', strictRateLimit, adminGuard, validateReorderSteps, stepController.reorder);

  return router;
}
