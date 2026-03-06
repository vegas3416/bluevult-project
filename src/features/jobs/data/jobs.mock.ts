import type { Job } from '@/domain/models';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    customerId: 'c1',
    title: 'Mary Lou-light install',
    address: '123 Oak St',
    city: 'Pflugerville',
    status: 'scheduled',
    scheduledAt: 'Today 3:00 PM',
    internalNotes: 'Front roofline install',
    createdAt: '2026-03-05T10:00:00Z',
    updatedAt: '2026-03-05T10:00:00Z',
  },
  {
    id: '2',
    customerId: 'c2',
    title: 'David Wright -Quote Follow-up',
    address: '55 Barton Rd',
    city: 'Georgetown',
    status: 'lead',
    scheduledAt: 'Today 5:30 PM',
    internalNotes: 'Customer requested warm white lights',
    createdAt: '2026-03-04T09:00:00Z',
    updatedAt: '2026-03-04T09:00:00Z',
  },
];
