import { Agency } from './agency.types';
import { Service } from './service.types';
import { Requirement } from './requirement.types';
import { UserProgress } from './progress.types';

export interface StepWithRequirements {
  id: string;
  service_id: string;
  order: number;
  title: string;
  description: string | null;
  is_optional: boolean;
  created_at: Date;
  updated_at: Date;
  requirements: Requirement[];
}

export interface ServiceWithDetails extends Service {
  agency: Agency;
  steps: StepWithRequirements[];
}

export interface StepWithProgress extends StepWithRequirements {
  is_completed: boolean;
  completed_at: Date | null;
}

export interface ServiceWithProgress extends ServiceWithDetails {
  steps: StepWithProgress[];
  completion_percentage: number;
}
