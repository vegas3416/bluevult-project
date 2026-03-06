export interface Customer {
  id: string;

  name: string;

  phone?: string;
  email?: string;

  address?: string;
  city?: string;

  notes?: string;

  createdAt: string;
}
