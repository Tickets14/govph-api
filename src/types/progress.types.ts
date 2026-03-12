export interface UserProgress {
  id: string;
  user_id: string;
  service_id: string;
  step_id: string;
  is_completed: boolean;
  completed_at: Date | null;
}

export interface CreateProgressInput {
  user_id: string;
  service_id: string;
  step_id: string;
  is_completed?: boolean;
}

export interface UpdateProgressInput {
  is_completed?: boolean;
  completed_at?: Date | null;
}
