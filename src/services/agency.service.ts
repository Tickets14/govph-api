import { Agency, CreateAgencyInput, UpdateAgencyInput } from '../types/agency.types';
import { AgencyRepository } from '../repositories/agency.repository';
import { PaginatedResponse } from '../types/common.types';
import { parsePagination } from '../utils/pagination';
import { generateId } from '../utils/uuid';
import { AgencyNotFoundError, ConflictError } from '../middleware/error.middleware';

export class AgencyService {
  constructor(private readonly repo: AgencyRepository) {}

  async getAllAgencies(query: { page?: unknown; limit?: unknown } = {}): Promise<PaginatedResponse<Agency>> {
    const { page, limit, offset } = parsePagination(query);
    const [data, total] = await Promise.all([this.repo.findAll(limit, offset), this.repo.count()]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getAgencyById(id: string): Promise<Agency> {
    const agency = await this.repo.findById(id);
    if (!agency) throw new AgencyNotFoundError(id);
    return agency;
  }

  async getAgencyBySlug(slug: string): Promise<Agency> {
    const agency = await this.repo.findBySlug(slug);
    if (!agency) throw new AgencyNotFoundError(slug);
    return agency;
  }

  async createAgency(dto: CreateAgencyInput): Promise<Agency> {
    const existing = await this.repo.findBySlug(dto.slug);
    if (existing) throw new ConflictError(`Slug '${dto.slug}' is already taken`);
    return this.repo.create({
      id: generateId(),
      ...dto,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async updateAgency(id: string, dto: UpdateAgencyInput): Promise<Agency> {
    const agency = await this.repo.findById(id);
    if (!agency) throw new AgencyNotFoundError(id);
    if (dto.slug && dto.slug !== agency.slug) {
      const conflict = await this.repo.findBySlug(dto.slug);
      if (conflict) throw new ConflictError(`Slug '${dto.slug}' is already taken`);
    }
    return (await this.repo.update(id, dto))!;
  }

  async deleteAgency(id: string): Promise<void> {
    const agency = await this.repo.findById(id);
    if (!agency) throw new AgencyNotFoundError(id);
    await this.repo.delete(id);
  }
}
