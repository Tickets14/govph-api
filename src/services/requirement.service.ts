import { Requirement, CreateRequirementInput, UpdateRequirementInput } from '../types/requirement.types';
import { RequirementRepository } from '../repositories/requirement.repository';
import { StepRepository } from '../repositories/step.repository';
import { ServiceRepository } from '../repositories/service.repository';
import { generateId } from '../utils/uuid';
import { StepNotFoundError, ServiceNotFoundError, RequirementNotFoundError } from '../middleware/error.middleware';

export class RequirementService {
  constructor(
    private readonly repo: RequirementRepository,
    private readonly stepRepo: StepRepository,
    private readonly serviceRepo: ServiceRepository
  ) {}

  async getByStepId(stepId: string): Promise<Requirement[]> {
    const step = await this.stepRepo.findById(stepId);
    if (!step) throw new StepNotFoundError(stepId);
    return this.repo.findByStep(stepId);
  }

  async getByServiceId(serviceId: string): Promise<Requirement[]> {
    const service = await this.serviceRepo.findById(serviceId);
    if (!service) throw new ServiceNotFoundError(serviceId);
    return this.repo.findByService(serviceId);
  }

  async getById(id: string): Promise<Requirement> {
    const req = await this.repo.findById(id);
    if (!req) throw new RequirementNotFoundError(id);
    return req;
  }

  async create(input: CreateRequirementInput): Promise<Requirement> {
    const [step, service] = await Promise.all([
      this.stepRepo.findById(input.step_id),
      this.serviceRepo.findById(input.service_id),
    ]);
    if (!step) throw new StepNotFoundError(input.step_id);
    if (!service) throw new ServiceNotFoundError(input.service_id);
    return this.repo.create({
      id: generateId(),
      is_optional: false,
      ...input,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async update(id: string, input: UpdateRequirementInput): Promise<Requirement> {
    const req = await this.repo.findById(id);
    if (!req) throw new RequirementNotFoundError(id);
    return (await this.repo.update(id, input))!;
  }

  async delete(id: string): Promise<void> {
    const req = await this.repo.findById(id);
    if (!req) throw new RequirementNotFoundError(id);
    await this.repo.delete(id);
  }
}
