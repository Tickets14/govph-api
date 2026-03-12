import { Agency } from '../../types/agency.types';

export interface IAgencyRepository {
  findAll(limit?: number, offset?: number): Promise<Agency[]>;
  findById(id: string): Promise<Agency | undefined>;
  findBySlug(slug: string): Promise<Agency | undefined>;
  create(data: Partial<Agency>): Promise<Agency>;
  update(id: string, data: Partial<Agency>): Promise<Agency | undefined>;
  delete(id: string): Promise<boolean>;
}
