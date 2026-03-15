import { Step, CreateStepInput, UpdateStepInput } from '../types/step.types';
import { StepRepository } from '../repositories/step.repository';
import { ServiceRepository } from '../repositories/service.repository';
import { generateId } from '../utils/uuid';
import { ServiceNotFoundError, StepNotFoundError } from '../middleware/error.middleware';

export class StepService {
  constructor(
    private readonly repo: StepRepository,
    private readonly serviceRepo: ServiceRepository
  ) {}

  async getByServiceId(serviceId: string): Promise<Step[]> {
    const service = await this.serviceRepo.findById(serviceId);
    if (!service) throw new ServiceNotFoundError(serviceId);
    return this.repo.findByService(serviceId);
  }

  async getById(id: string): Promise<Step> {
    const step = await this.repo.findById(id);
    if (!step) throw new StepNotFoundError(id);
    return step;
  }

  async create(input: CreateStepInput): Promise<Step> {
    const service = await this.serviceRepo.findById(input.service_id);
    if (!service) throw new ServiceNotFoundError(input.service_id);
    return this.repo.create({
      id: generateId(),
      is_optional: false,
      ...input,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async update(id: string, input: UpdateStepInput): Promise<Step> {
    const step = await this.repo.findById(id);
    if (!step) throw new StepNotFoundError(id);
    return (await this.repo.update(id, input))!;
  }

  async reorder(serviceId: string, stepIds: string[]): Promise<Step[]> {
    const service = await this.serviceRepo.findById(serviceId);
    if (!service) throw new ServiceNotFoundError(serviceId);
    await this.repo.reorder(serviceId, stepIds);
    return this.repo.findByService(serviceId);
  }

  async delete(id: string): Promise<void> {
    const step = await this.repo.findById(id);
    if (!step) throw new StepNotFoundError(id);
    await this.repo.delete(id);
  }
}
