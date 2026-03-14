import { Service } from '../../types/service.types';

export interface ServiceFilters {
  agency_id?: string;
  agency_slug?: string; // slug-based filter, e.g. "dfa" — resolved via JOIN
  is_active?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface IServiceRepository {
  findFiltered(filters?: ServiceFilters): Promise<Service[]>;
  countFiltered(filters?: Omit<ServiceFilters, 'limit' | 'offset'>): Promise<number>;
  findById(id: string): Promise<Service | undefined>;
  findBySlug(slug: string): Promise<Service | undefined>;
  findByAgency(agencyId: string): Promise<Service[]>;
  create(data: Partial<Service>): Promise<Service>;
  update(id: string, data: Partial<Service>): Promise<Service | undefined>;
  delete(id: string): Promise<boolean>;
}
