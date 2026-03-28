import { Agency, CreateAgencyInput, UpdateAgencyInput } from '../types/agency.types';
import { AgencyRepository } from '../repositories/agency.repository';
import { AgencyFilters } from '../repositories/interfaces/agency.repository.interface';
import { PaginatedResponse } from '../types/common.types';
import { parsePagination } from '../utils/pagination';
import { generateId } from '../utils/uuid';
import { AgencyNotFoundError, ConflictError } from '../middleware/error.middleware';

export class AgencyService {
  constructor(private readonly repo: AgencyRepository) {}

  async getAllAgencies(
    filters?: Omit<AgencyFilters, 'limit' | 'offset'>,
    paginationQuery: { page?: unknown; limit?: unknown } = {}
  ): Promise<PaginatedResponse<Agency>> {
    const { page, limit, offset } = parsePagination(paginationQuery);
    const [data, total] = await Promise.all([
      this.repo.findFiltered({ ...filters, limit, offset }),
      this.repo.countFiltered(filters),
    ]);
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

  async getAgencyByAcronym(acronym: string): Promise<Agency> {
    const agency = await this.repo.findByAcronym(acronym);
    if (!agency) throw new AgencyNotFoundError(acronym);
    return agency;
  }

  async createAgency(dto: CreateAgencyInput): Promise<Agency> {
    const existing = await this.repo.findByAcronym(dto.acronym);
    if (existing) throw new ConflictError(`Acronym '${dto.acronym}' is already taken`);
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
    if (dto.acronym && dto.acronym !== agency.acronym) {
      const conflict = await this.repo.findByAcronym(dto.acronym);
      if (conflict) throw new ConflictError(`Acronym '${dto.acronym}' is already taken`);
    }
    return (await this.repo.update(id, dto))!;
  }

  async deleteAgency(id: string): Promise<void> {
    const agency = await this.repo.findById(id);
    if (!agency) throw new AgencyNotFoundError(id);
    await this.repo.delete(id);
  }
}
