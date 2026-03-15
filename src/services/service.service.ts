import { Service, CreateServiceInput, UpdateServiceInput } from '../types/service.types';
import { ServiceWithDetails, ServiceWithProgress, StepWithProgress } from '../types/service-detail.types';
import { ServiceFilters } from '../repositories/interfaces/service.repository.interface';
import { ServiceRepository } from '../repositories/service.repository';
import { AgencyRepository } from '../repositories/agency.repository';
import { StepRepository } from '../repositories/step.repository';
import { RequirementRepository } from '../repositories/requirement.repository';
import { UserProgressRepository } from '../repositories/user-progress.repository';
import { PaginatedResponse } from '../types/common.types';
import { parsePagination } from '../utils/pagination';
import { generateId } from '../utils/uuid';
import { AgencyNotFoundError, ServiceNotFoundError, ConflictError } from '../middleware/error.middleware';

export class ServiceService {
  constructor(
    private readonly repo: ServiceRepository,
    private readonly agencyRepo: AgencyRepository,
    private readonly stepRepo: StepRepository,
    private readonly requirementRepo: RequirementRepository,
    private readonly progressRepo: UserProgressRepository
  ) {}

  async getAllServices(
    filters?: Omit<ServiceFilters, 'limit' | 'offset'>,
    paginationQuery: { page?: unknown; limit?: unknown } = {}
  ): Promise<PaginatedResponse<Service>> {
    const { page, limit, offset } = parsePagination(paginationQuery);
    const [data, total] = await Promise.all([
      this.repo.findFiltered({ ...filters, limit, offset }),
      this.repo.countFiltered(filters),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async getServiceBySlug(slug: string): Promise<ServiceWithDetails> {
    const service = await this.repo.findBySlug(slug);
    if (!service) throw new ServiceNotFoundError(slug);

    const [agency, steps, allRequirements] = await Promise.all([
      this.agencyRepo.findById(service.agency_id),
      this.stepRepo.findByService(service.id),
      this.requirementRepo.findByService(service.id),
    ]);

    if (!agency) throw new AgencyNotFoundError(service.agency_id);

    const requirementsByStep = new Map(steps.map((s) => [s.id, allRequirements.filter((r) => r.step_id === s.id)]));

    return {
      ...service,
      agency,
      steps: steps.map((step) => ({
        ...step,
        requirements: requirementsByStep.get(step.id) ?? [],
      })),
    };
  }

  async getServiceWithProgress(slug: string, userId: string): Promise<ServiceWithProgress> {
    const serviceDetail = await this.getServiceBySlug(slug);
    const progressRecords = await this.progressRepo.findByUserAndService(userId, serviceDetail.id);

    const progressByStep = new Map(progressRecords.map((p) => [p.step_id, p]));

    const stepsWithProgress: StepWithProgress[] = serviceDetail.steps.map((step) => {
      const prog = progressByStep.get(step.id);
      return {
        ...step,
        is_completed: prog?.is_completed ?? false,
        completed_at: prog?.completed_at ?? null,
      };
    });

    const completedCount = stepsWithProgress.filter((s) => s.is_completed).length;
    const totalSteps = stepsWithProgress.length;
    const completion_percentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

    return { ...serviceDetail, steps: stepsWithProgress, completion_percentage };
  }

  async createService(dto: CreateServiceInput) {
    const agency = await this.agencyRepo.findById(dto.agency_id);
    if (!agency) throw new AgencyNotFoundError(dto.agency_id);

    const existing = await this.repo.findBySlug(dto.slug);
    if (existing) throw new ConflictError(`Slug '${dto.slug}' is already taken`);

    return this.repo.create({
      id: generateId(),
      is_active: true,
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async updateService(id: string, dto: UpdateServiceInput) {
    const service = await this.repo.findById(id);
    if (!service) throw new ServiceNotFoundError(id);

    if (dto.slug && dto.slug !== service.slug) {
      const conflict = await this.repo.findBySlug(dto.slug);
      if (conflict) throw new ConflictError(`Slug '${dto.slug}' is already taken`);
    }
    return (await this.repo.update(id, dto))!;
  }

  async deleteService(id: string): Promise<void> {
    const service = await this.repo.findById(id);
    if (!service) throw new ServiceNotFoundError(id);
    await this.repo.delete(id);
  }
}
