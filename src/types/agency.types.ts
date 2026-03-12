export interface Agency {
  id: string;
  name: string;
  slug: string;
  website_url: string | null;
  logo_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAgencyInput {
  name: string;
  slug: string;
  website_url?: string | null;
  logo_url?: string | null;
}

export interface UpdateAgencyInput {
  name?: string;
  slug?: string;
  website_url?: string | null;
  logo_url?: string | null;
}
