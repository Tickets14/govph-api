export interface Service {
  id: string;
  agency_id: string;
  name: string;
  slug: string;
  description: string;
  estimated_time: string | null;
  appointment_url: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateServiceInput {
  agency_id: string;
  name: string;
  slug: string;
  description: string;
  estimated_time?: string | null;
  appointment_url?: string | null;
  is_active?: boolean;
}

export interface UpdateServiceInput {
  agency_id?: string;
  name?: string;
  slug?: string;
  description?: string;
  estimated_time?: string | null;
  appointment_url?: string | null;
  is_active?: boolean;
}
