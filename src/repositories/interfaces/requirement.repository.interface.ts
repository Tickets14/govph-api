import { Requirement } from '../../types/requirement.types';

export interface IRequirementRepository {
  findByStep(stepId: string): Promise<Requirement[]>;
  findByService(serviceId: string): Promise<Requirement[]>;
  findById(id: string): Promise<Requirement | undefined>;
  create(data: Partial<Requirement>): Promise<Requirement>;
  update(id: string, data: Partial<Requirement>): Promise<Requirement | undefined>;
  delete(id: string): Promise<boolean>;
}
