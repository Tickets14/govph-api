import db from '../config/database';

export abstract class BaseRepository<T extends { id: string }> {
  protected abstract tableName: string;

  protected get db() {
    return db;
  }

  async findAll(limit?: number, offset?: number): Promise<T[]> {
    let query = db(this.tableName).select('*');
    if (limit !== undefined) query = query.limit(limit);
    if (offset !== undefined) query = query.offset(offset);
    return query as unknown as T[];
  }

  async count(): Promise<number> {
    const result = await db(this.tableName)
      .count('* as count')
      .first() as { count: string } | undefined;
    return Number(result?.count ?? 0);
  }

  async findById(id: string): Promise<T | undefined> {
    return db(this.tableName).where({ id }).first() as Promise<T | undefined>;
  }

  async create(data: Partial<T>): Promise<T> {
    const rows = await db(this.tableName).insert(data).returning('*') as unknown as T[];
    return rows[0];
  }

  async update(id: string, data: Partial<T>): Promise<T | undefined> {
    const rows = await db(this.tableName)
      .where({ id })
      .update({ ...data, updated_at: new Date() })
      .returning('*') as unknown as T[];
    return rows[0];
  }

  async delete(id: string): Promise<boolean> {
    const count = await db(this.tableName).where({ id }).delete();
    return count > 0;
  }
}
