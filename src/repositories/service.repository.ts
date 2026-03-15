import type { Knex } from 'knex';
import { Service } from '../types/service.types';
import { TABLES } from '../constants/tables';
import { BaseRepository } from './base.repository';
import { IServiceRepository, ServiceFilters } from './interfaces/service.repository.interface';

export class ServiceRepository extends BaseRepository<Service> implements IServiceRepository {
  protected tableName = TABLES.SERVICES;

  private applyFilters(query: Knex.QueryBuilder, filters?: Omit<ServiceFilters, 'limit' | 'offset'>) {
    if (filters?.agency_id) {
      void query.where('s.agency_id', filters.agency_id);
    }
    if (filters?.agency_slug) {
      void query.where('a.slug', filters.agency_slug);
    }
    if (filters?.is_active !== undefined) {
      void query.where('s.is_active', filters.is_active);
    }
    if (filters?.search) {
      const term = `%${filters.search}%`;
      void query.where((qb) => {
        void qb.whereILike('s.name', term).orWhereILike('s.description', term).orWhereILike('a.name', term);
      });
    }
  }

  async findFiltered(filters?: ServiceFilters): Promise<Service[]> {
    const query = this.db(`${this.tableName} as s`)
      .join(`${TABLES.AGENCIES} as a`, 's.agency_id', 'a.id')
      .select('s.*');

    this.applyFilters(query, filters);

    void query.orderBy('s.name', 'asc');

    if (filters?.limit !== undefined) void query.limit(filters.limit);
    if (filters?.offset !== undefined) void query.offset(filters.offset);

    const rows = await query;
    return rows as unknown as Service[];
  }

  async countFiltered(filters?: Omit<ServiceFilters, 'limit' | 'offset'>): Promise<number> {
    const query = this.db(`${this.tableName} as s`)
      .join(`${TABLES.AGENCIES} as a`, 's.agency_id', 'a.id')
      .count('s.id as count')
      .first();

    this.applyFilters(query, filters);

    const result = (await query) as { count: string } | undefined;
    return Number(result?.count ?? 0);
  }

  async findBySlug(slug: string): Promise<Service | undefined> {
    const row = (await this.db(this.tableName).where({ slug }).first()) as unknown as Service | undefined;
    return row;
  }

  async findByAgency(agencyId: string): Promise<Service[]> {
    const rows = await this.db(this.tableName).where({ agency_id: agencyId, is_active: true }).orderBy('name', 'asc');
    return rows as unknown as Service[];
  }
}
