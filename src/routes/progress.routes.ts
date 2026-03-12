import { Router } from 'express';
import { ProgressController } from '../controllers/progress.controller';
import {
  validateProgressServiceParams,
  validateToggleProgress,
} from '../validators/progress.validator';

/**
 * Mounted at /progress
 *
 * GET    /:serviceId          → get progress summary  (X-User-Id required)
 * POST   /:serviceId/toggle   → toggle a step          (X-User-Id required)
 * DELETE /:serviceId          → reset all progress     (X-User-Id required)
 */
export function progressRoutes(controller: ProgressController): Router {
  const router = Router();

  router.get('/:serviceId', validateProgressServiceParams, controller.getProgress);
  router.post('/:serviceId/toggle', validateToggleProgress, controller.toggleStep);
  router.delete('/:serviceId', validateProgressServiceParams, controller.resetProgress);

  return router;
}
