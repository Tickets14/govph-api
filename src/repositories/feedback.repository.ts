import type { Knex } from 'knex';
import { Feedback } from '../types/feedback.types';
import { TABLES } from '../constants/tables';
import { BaseRepository } from './base.repository';
import { IFeedbackRepository, FeedbackFilters } from './interfaces/feedback.repository.interface';

export class FeedbackRepository extends BaseRepository<Feedback> implements IFeedbackRepository {
  protected tableName = TABLES.FEEDBACKS;

  private applyFilters(query: Knex.QueryBuilder, filters?: Omit<FeedbackFilters, 'limit' | 'offset'>) {
    if (filters?.type) {
      void query.where('type', filters.type);
    }
    if (filters?.status) {
      void query.where('status', filters.status);
    }
    if (filters?.search) {
      const term = `%${filters.search}%`;
      void query.where((qb) => {
        void qb.whereILike('subject', term).orWhereILike('description', term);
      });
    }
  }

  async findFiltered(filters?: FeedbackFilters): Promise<Feedback[]> {
    const query = this.db(this.tableName).select('*');

    this.applyFilters(query, filters);

    void query.orderBy('created_at', 'desc');

    if (filters?.limit !== undefined) void query.limit(filters.limit);
    if (filters?.offset !== undefined) void query.offset(filters.offset);

    const rows = await query;
    return rows as unknown as Feedback[];
  }

  async countFiltered(filters?: Omit<FeedbackFilters, 'limit' | 'offset'>): Promise<number> {
    const query = this.db(this.tableName).count('id as count').first();

    this.applyFilters(query, filters);

    const result = (await query) as { count: string } | undefined;
    return Number(result?.count ?? 0);
  }

  async findAll(limit?: number, offset?: number): Promise<Feedback[]> {
    let query = this.db(this.tableName).select('*').orderBy('created_at', 'desc');
    if (limit !== undefined) query = query.limit(limit);
    if (offset !== undefined) query = query.offset(offset);
    const rows = await query;
    return rows as unknown as Feedback[];
  }
}
