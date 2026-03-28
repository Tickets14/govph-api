import { Router } from 'express';
import { FeedbackController } from '../controllers/feedback.controller';
import { adminGuard } from '../middleware/admin-guard.middleware';
import { strictRateLimit } from '../middleware/rate-limit.middleware';
import {
  validateFeedbackFilter,
  validateFeedbackIdParams,
  validateCreateFeedback,
  validateUpdateFeedback,
} from '../validators/feedback.validator';

/**
 * Mounted at /feedbacks
 *
 * Public
 *   POST /           → submit a new feedback (rate-limited)
 *
 * Admin  (requires X-Admin-Key header)
 *   GET    /          → list all feedbacks with filters
 *   GET    /:id       → get single feedback
 *   PUT    /:id       → update status
 *   DELETE /:id       → delete
 */
export function feedbackRoutes(controller: FeedbackController): Router {
  const router = Router();

  // ── Public ────────────────────────────────────────────────────────────────
  router.post('/', strictRateLimit, validateCreateFeedback, controller.create);

  // ── Admin ─────────────────────────────────────────────────────────────────
  router.get('/', adminGuard, validateFeedbackFilter, controller.getAll);
  router.get('/:id', adminGuard, validateFeedbackIdParams, controller.getById);
  router.put('/:id', strictRateLimit, adminGuard, validateUpdateFeedback, controller.update);
  router.delete('/:id', strictRateLimit, adminGuard, validateFeedbackIdParams, controller.delete);

  return router;
}
