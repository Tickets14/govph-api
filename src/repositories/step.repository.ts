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

  /**
   * Reorders steps by assigning each stepId the position index (1-based)
   * corresponding to its position in the provided array.
   * Runs in a transaction.
   */
  async reorder(serviceId: string, stepIds: string[]): Promise<void> {
    await db.transaction(async (trx) => {
      for (let i = 0; i < stepIds.length; i++) {
        await trx(this.tableName)
          .where({ id: stepIds[i], service_id: serviceId })
          .update({ order: i + 1, updated_at: new Date() });
      }
    });
  }
}
