import { Agency } from '../types/agency.types';
import { TABLES } from '../constants/tables';
import { BaseRepository } from './base.repository';
import { IAgencyRepository } from './interfaces/agency.repository.interface';

export class AgencyRepository
  extends BaseRepository<Agency>
  implements IAgencyRepository
{
  protected tableName = TABLES.AGENCIES;

  async findAll(limit?: number, offset?: number): Promise<Agency[]> {
    let query = this.db(this.tableName).select('*').orderBy('name', 'asc');
    if (limit !== undefined) query = query.limit(limit);
    if (offset !== undefined) query = query.offset(offset);
    return query as unknown as Agency[];
  }

  async findBySlug(slug: string): Promise<Agency | undefined> {
    return this.db(this.tableName).where({ slug }).first() as Promise<Agency | undefined>;
  }
}
