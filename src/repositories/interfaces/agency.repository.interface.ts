import { Agency } from '../../types/agency.types';

export interface AgencyFilters {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface IAgencyRepository {
  findFiltered(filters?: AgencyFilters): Promise<Agency[]>;
  countFiltered(filters?: Omit<AgencyFilters, 'limit' | 'offset'>): Promise<number>;
  findAll(limit?: number, offset?: number): Promise<Agency[]>;
  findById(id: string): Promise<Agency | undefined>;
  findByAcronym(acronym: string): Promise<Agency | undefined>;
  create(data: Partial<Agency>): Promise<Agency>;
  update(id: string, data: Partial<Agency>): Promise<Agency | undefined>;
  delete(id: string): Promise<boolean>;
}
