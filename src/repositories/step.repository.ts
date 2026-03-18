import db from '../config/database';
import { Step } from '../types/step.types';
import { TABLES } from '../constants/tables';
import { BaseRepository } from './base.repository';
import { IStepRepository } from './interfaces/step.repository.interface';

export class StepRepository extends BaseRepository<Step> implements IStepRepository {
  protected tableName = TABLES.STEPS;

  async findByService(serviceId: string): Promise<Step[]> {
    const rows = await this.db(this.tableName).where({ service_id: serviceId }).orderBy('order', 'asc');
    return rows as unknown as Step[];
  }

  async createMany(data: Partial<Step>[]): Promise<Step[]> {
    if (data.length === 0) return [];
    const rows = await this.db.transaction(async (trx) => {
      const inserted = (await trx(this.tableName).insert(data).returning('*')) as unknown as Step[];
      return inserted;
    });
    return rows;
  }

  /**
   * Reorders steps by assigning each stepId the position index (1-based)
   * corresponding to its position in the provided array.
   * Runs in a transaction.
   */
  async reorder(serviceId: string, stepIds: string[]): Promise<void> {
    await db.transaction(async (trx) => {
      // First, shift all affected steps to temporary high values to avoid
      // unique constraint conflicts during sequential updates.
      const offset = stepIds.length + 1000;
      for (let i = 0; i < stepIds.length; i++) {
        await trx(this.tableName)
          .where({ id: stepIds[i], service_id: serviceId })
          .update({ order: offset + i, updated_at: new Date() });
      }
      // Then assign final order values.
      for (let i = 0; i < stepIds.length; i++) {
        await trx(this.tableName)
          .where({ id: stepIds[i], service_id: serviceId })
          .update({ order: i + 1, updated_at: new Date() });
      }
    });
  }
}
