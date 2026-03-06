export type JobStatus = 'lead' | 'scheduled' | 'in_progress' | 'completed' | 'closed';

export interface Job {
  id: string;

  customerId: string;

  title: string;

  address: string;
  city: string;

  status: JobStatus;

  scheduledAt?: string;

  internalNotes?: string;

  createdAt: string;
  updatedAt: string;
}
