import { UserProgress } from '../../types/progress.types';

export interface IUserProgressRepository {
  findByUserAndService(userId: string, serviceId: string): Promise<UserProgress[]>;
  upsert(userId: string, serviceId: string, stepId: string, isCompleted: boolean): Promise<UserProgress>;
  resetProgress(userId: string, serviceId: string): Promise<void>;
}
