import db from '../config/database';
import { UserProgress } from '../types/progress.types';
import { TABLES } from '../constants/tables';
import { generateId } from '../utils/uuid';
import { IUserProgressRepository } from './interfaces/user-progress.repository.interface';

export class UserProgressRepository implements IUserProgressRepository {
  private tableName = TABLES.USER_PROGRESS;

  async findByUserAndService(userId: string, serviceId: string): Promise<UserProgress[]> {
    return db(this.tableName)
      .where({ user_id: userId, service_id: serviceId })
      .select('*') as unknown as UserProgress[];
  }

  async upsert(
    userId: string,
    serviceId: string,
    stepId: string,
    isCompleted: boolean,
  ): Promise<UserProgress> {
    const existing = await db(this.tableName)
      .where({ user_id: userId, service_id: serviceId, step_id: stepId })
      .first() as UserProgress | undefined;

    if (existing) {
      const completedAt =
        isCompleted && !existing.completed_at ? new Date() : existing.completed_at;
      const [row] = await db(this.tableName)
        .where({ id: existing.id })
        .update({ is_completed: isCompleted, completed_at: completedAt })
        .returning('*') as unknown as UserProgress[];
      return row;
    }

    const [row] = await db(this.tableName)
      .insert({
        id: generateId(),
        user_id: userId,
        service_id: serviceId,
        step_id: stepId,
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date() : null,
      })
      .returning('*') as unknown as UserProgress[];
    return row;
  }

  async resetProgress(userId: string, serviceId: string): Promise<void> {
    await db(this.tableName)
      .where({ user_id: userId, service_id: serviceId })
      .update({ is_completed: false, completed_at: null });
  }
}
