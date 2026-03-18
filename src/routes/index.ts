import { Router } from 'express';
import { agencyRoutes } from './agencies.routes';
import { serviceRoutes } from './services.routes';
import { stepRoutes } from './steps.routes';
import { requirementRoutes } from './requirements.routes';
import { progressRoutes } from './progress.routes';
import {
  agencyController,
  serviceController,
  stepController,
  requirementController,
  progressController,
} from '../container';

const router = Router();

/**
 * Health check
 * GET /api/v1/health
 */
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    version: 'v1',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Agencies
 *   GET    /agencies
 *   GET    /agencies/:acronym
 *   POST   /agencies
 *   PUT    /agencies/:id
 *   DELETE /agencies/:id
 */
router.use('/agencies', agencyRoutes(agencyController));

/**
 * Services (includes nested step mutation routes)
 *   GET    /services
 *   GET    /services/:slug/progress
 *   GET    /services/:slug
 *   POST   /services
 *   PUT    /services/:id
 *   DELETE /services/:id
 *   POST   /services/:serviceId/steps (bulk)
 *   PATCH  /services/:serviceId/steps/reorder
 */
router.use('/services', serviceRoutes(serviceController, stepController));

/**
 * Steps — standalone mutations + nested requirement creation
 *   PUT    /steps/:id
 *   DELETE /steps/:id
 *   POST   /steps/:stepId/requirements
 */
router.use('/steps', stepRoutes(stepController, requirementController));

/**
 * Requirements — standalone mutations
 *   PUT    /requirements/:id
 *   DELETE /requirements/:id
 */
router.use('/requirements', requirementRoutes(requirementController));

/**
 * Progress (X-User-Id header required)
 *   GET    /progress/:serviceId
 *   POST   /progress/:serviceId/toggle
 *   DELETE /progress/:serviceId
 */
router.use('/progress', progressRoutes(progressController));

export default router;
