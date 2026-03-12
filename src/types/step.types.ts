export interface Step {
  id: string;
  service_id: string;
  order: number;
  title: string;
  description: string | null;
  is_optional: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateStepInput {
  service_id: string;
  order: number;
  title: string;
  description?: string | null;
  is_optional?: boolean;
}

export interface UpdateStepInput {
  service_id?: string;
  order?: number;
  title?: string;
  description?: string | null;
  is_optional?: boolean;
}
