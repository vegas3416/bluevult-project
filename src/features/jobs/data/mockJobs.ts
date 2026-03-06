export type JobStatus = 'Open' | 'Scheduled' | 'Closed';

export type Job = {
  id: string;
  customerName: string;
  city: string;
  title: string;
  status: JobStatus;
  scheduledAt?: string; // e.g. "2026-03-02 3:00 PM"
  notes?: string;
  imageUrl?: string;
};

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    customerName: 'Mike R.',
    city: 'Pflugerville',
    title: 'Install Lights',
    status: 'Scheduled',
    scheduledAt: 'Today 3:00 PM',
    notes: 'Front roofline + back patio.',
    imageUrl:
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2b24?auto=format&fit=crop&w=1200&q=60',
  },
  {
    id: '2',
    customerName: 'Ashley C.',
    city: 'Georgetown',
    title: 'Quote Follow-up',
    status: 'Open',
    scheduledAt: 'Today 5:30 PM',
    notes: 'Follow up on estimate sent last week.',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=60',
  },
];

export function getJobById(id: string): Job | undefined {
  return MOCK_JOBS.find(j => j.id === id);
}
