import { UserProgress } from '../types/progress.types';
import { UserProgressRepository } from '../repositories/user-progress.repository';
import { ServiceRepository } from '../repositories/service.repository';
import { StepRepository } from '../repositories/step.repository';
import { ServiceNotFoundError, StepNotFoundError, InvalidProgressError } from '../middleware/error.middleware';

export interface ProgressSummary {
  records: UserProgress[];
  completion_percentage: number;
  completed_steps: number;
  total_steps: number;
}

export class ProgressService {
  constructor(
    private readonly progressRepo: UserProgressRepository,
    private readonly serviceRepo: ServiceRepository,
    private readonly stepRepo: StepRepository
  ) {}

  async getProgress(userId: string, serviceId: string): Promise<ProgressSummary> {
    const service = await this.serviceRepo.findById(serviceId);
    if (!service) throw new ServiceNotFoundError(serviceId);

    const [records, steps] = await Promise.all([
      this.progressRepo.findByUserAndService(userId, serviceId),
      this.stepRepo.findByService(serviceId),
    ]);

    const completedSet = new Set(records.filter((r) => r.is_completed).map((r) => r.step_id));
    const completed_steps = steps.filter((s) => completedSet.has(s.id)).length;
    const total_steps = steps.length;
    const completion_percentage = total_steps > 0 ? Math.round((completed_steps / total_steps) * 100) : 0;

    return { records, completion_percentage, completed_steps, total_steps };
  }

  async toggleStep(userId: string, serviceId: string, stepId: string): Promise<UserProgress> {
    const [service, step] = await Promise.all([this.serviceRepo.findById(serviceId), this.stepRepo.findById(stepId)]);
    if (!service) throw new ServiceNotFoundError(serviceId);
    if (!step) throw new StepNotFoundError(stepId);

    if (step.service_id !== serviceId) {
      throw new InvalidProgressError(`Step '${stepId}' does not belong to service '${serviceId}'`);
    }

    const [existing] = (await this.progressRepo.findByUserAndService(userId, serviceId)).filter(
      (r) => r.step_id === stepId
    );
    const newState = !(existing?.is_completed ?? false);
    return this.progressRepo.upsert(userId, serviceId, stepId, newState);
  }

  async resetProgress(userId: string, serviceId: string): Promise<void> {
    const service = await this.serviceRepo.findById(serviceId);
    if (!service) throw new ServiceNotFoundError(serviceId);
    await this.progressRepo.resetProgress(userId, serviceId);
  }

  async getCompletionPercentage(userId: string, serviceId: string): Promise<number> {
    const { completion_percentage } = await this.getProgress(userId, serviceId);
    return completion_percentage;
  }
}
