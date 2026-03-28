// Repositories
import { AgencyRepository } from '../repositories/agency.repository';
import { ServiceRepository } from '../repositories/service.repository';
import { StepRepository } from '../repositories/step.repository';
import { RequirementRepository } from '../repositories/requirement.repository';
import { UserProgressRepository } from '../repositories/user-progress.repository';
import { FeedbackRepository } from '../repositories/feedback.repository';

// Services
import { AgencyService } from '../services/agency.service';
import { ServiceService } from '../services/service.service';
import { StepService } from '../services/step.service';
import { RequirementService } from '../services/requirement.service';
import { ProgressService } from '../services/progress.service';
import { FeedbackService } from '../services/feedback.service';

// Controllers
import { AgencyController } from '../controllers/agency.controller';
import { ServiceController } from '../controllers/service.controller';
import { StepController } from '../controllers/step.controller';
import { RequirementController } from '../controllers/requirement.controller';
import { ProgressController } from '../controllers/progress.controller';
import { FeedbackController } from '../controllers/feedback.controller';

// ─── Repositories ─────────────────────────────────────────────────────────────
const agencyRepository = new AgencyRepository();
const serviceRepository = new ServiceRepository();
const stepRepository = new StepRepository();
const requirementRepository = new RequirementRepository();
const userProgressRepository = new UserProgressRepository();
const feedbackRepository = new FeedbackRepository();

// ─── Services ─────────────────────────────────────────────────────────────────
const agencyService = new AgencyService(agencyRepository);

const serviceService = new ServiceService(
  serviceRepository,
  agencyRepository,
  stepRepository,
  requirementRepository,
  userProgressRepository
);

const stepService = new StepService(stepRepository, serviceRepository);

const requirementService = new RequirementService(requirementRepository, stepRepository, serviceRepository);

const progressService = new ProgressService(userProgressRepository, serviceRepository, stepRepository);

const feedbackService = new FeedbackService(feedbackRepository);

// ─── Controllers ──────────────────────────────────────────────────────────────
export const agencyController = new AgencyController(agencyService);
export const serviceController = new ServiceController(serviceService);
export const stepController = new StepController(stepService);
export const requirementController = new RequirementController(requirementService);
export const progressController = new ProgressController(progressService);
export const feedbackController = new FeedbackController(feedbackService);
