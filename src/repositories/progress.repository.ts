import { UserProgress } from '../types/progress.types';
import { TABLES } from '../constants/tables';
import { BaseRepository } from './base.repository';

export class ProgressRepository extends BaseRepository<UserProgress> {
  protected tableName = TABLES.USER_PROGRESS;

  async findByUserId(userId: string): Promise<UserProgress[]> {
    return this.db<UserProgress>(this.tableName).where({ user_id: userId }).select('*');
  }

  async findByUserAndService(userId: string, serviceId: string): Promise<UserProgress[]> {
    return this.db<UserProgress>(this.tableName).where({ user_id: userId, service_id: serviceId }).select('*');
  }

  async findByUserServiceAndStep(userId: string, serviceId: string, stepId: string): Promise<UserProgress | undefined> {
    return this.db<UserProgress>(this.tableName)
      .where({ user_id: userId, service_id: serviceId, step_id: stepId })
      .first();
  }
}
