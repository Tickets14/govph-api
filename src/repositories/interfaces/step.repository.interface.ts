import { Step } from '../../types/step.types';

export interface IStepRepository {
  findByService(serviceId: string): Promise<Step[]>;
  findById(id: string): Promise<Step | undefined>;
  create(data: Partial<Step>): Promise<Step>;
  createMany(data: Partial<Step>[]): Promise<Step[]>;
  update(id: string, data: Partial<Step>): Promise<Step | undefined>;
  reorder(serviceId: string, stepIds: string[]): Promise<void>;
  delete(id: string): Promise<boolean>;
}
