import type { Customer } from '@/domain/models';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Mike R.',
    phone: '(512) 555-1010',
    email: 'mike.r@example.com',
    address: '123 Oak St',
    city: 'Pflugerville',
    notes: 'Prefers text before arrival.',
    createdAt: '2026-03-01T09:00:00.000Z',
  },
  {
    id: 'c2',
    name: 'Ashley C.',
    phone: '(512) 555-2020',
    email: 'ashley.c@example.com',
    address: '88 Barton Rd',
    city: 'Georgetown',
    notes: 'Requested warm white lighting options.',
    createdAt: '2026-03-02T10:30:00.000Z',
  },
  {
    id: 'c3',
    name: 'Brandon K.',
    phone: '(512) 555-3030',
    email: 'brandon.k@example.com',
    address: '410 Cedar Ln',
    city: 'Austin',
    notes: 'Rear section issue reported after install.',
    createdAt: '2026-03-03T08:15:00.000Z',
  },
];
