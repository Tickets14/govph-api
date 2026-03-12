import { Requirement } from '../types/requirement.types';
import { TABLES } from '../constants/tables';
import { BaseRepository } from './base.repository';
import { IRequirementRepository } from './interfaces/requirement.repository.interface';

export class RequirementRepository
  extends BaseRepository<Requirement>
  implements IRequirementRepository
{
  protected tableName = TABLES.REQUIREMENTS;

  async findByStep(stepId: string): Promise<Requirement[]> {
    return this.db(this.tableName)
      .where({ step_id: stepId })
      .orderBy('is_optional', 'asc') as unknown as Requirement[];
  }

  async findByService(serviceId: string): Promise<Requirement[]> {
    return this.db(this.tableName)
      .where({ service_id: serviceId })
      .orderBy('is_optional', 'asc') as unknown as Requirement[];
  }
}
