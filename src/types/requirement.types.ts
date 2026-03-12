export interface Requirement {
  id: string;
  step_id: string;
  service_id: string;
  name: string;
  description: string | null;
  is_optional: boolean;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateRequirementInput {
  step_id: string;
  service_id: string;
  name: string;
  description?: string | null;
  is_optional?: boolean;
  notes?: string | null;
}

export interface UpdateRequirementInput {
  step_id?: string;
  service_id?: string;
  name?: string;
  description?: string | null;
  is_optional?: boolean;
  notes?: string | null;
}
