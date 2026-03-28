import type { Knex } from 'knex';
import { Agency } from '../types/agency.types';
import { TABLES } from '../constants/tables';
import { BaseRepository } from './base.repository';
import { IAgencyRepository, AgencyFilters } from './interfaces/agency.repository.interface';

export class AgencyRepository extends BaseRepository<Agency> implements IAgencyRepository {
  protected tableName = TABLES.AGENCIES;

  private applyFilters(query: Knex.QueryBuilder, filters?: Omit<AgencyFilters, 'limit' | 'offset'>) {
    if (filters?.search) {
      const term = `%${filters.search}%`;
      void query.where((qb) => {
        void qb.whereILike('name', term).orWhereILike('acronym', term).orWhereILike('description', term);
      });
    }
  }

  async findFiltered(filters?: AgencyFilters): Promise<Agency[]> {
    const query = this.db(this.tableName).select('*');

    this.applyFilters(query, filters);

    void query.orderBy('name', 'asc');

    if (filters?.limit !== undefined) void query.limit(filters.limit);
    if (filters?.offset !== undefined) void query.offset(filters.offset);

    const rows = await query;
    return rows as unknown as Agency[];
  }

  async countFiltered(filters?: Omit<AgencyFilters, 'limit' | 'offset'>): Promise<number> {
    const query = this.db(this.tableName).count('id as count').first();

    this.applyFilters(query, filters);

    const result = (await query) as { count: string } | undefined;
    return Number(result?.count ?? 0);
  }

  async findAll(limit?: number, offset?: number): Promise<Agency[]> {
    let query = this.db(this.tableName).select('*').orderBy('name', 'asc');
    if (limit !== undefined) query = query.limit(limit);
    if (offset !== undefined) query = query.offset(offset);
    const rows = await query;
    return rows as unknown as Agency[];
  }

  async findByAcronym(acronym: string): Promise<Agency | undefined> {
    return this.db(this.tableName).where({ acronym }).first() as Promise<Agency | undefined>;
  }
}
