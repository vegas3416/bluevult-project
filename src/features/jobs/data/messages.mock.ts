import type { Message } from '@/domain/models';

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    jobId: '1',
    sender: 'company',
    body: 'We’ll be there around 3 PM today.',
    sentAt: '2026-03-05T14:00:00Z',
    status: 'sent',
  },
  {
    id: 'm2',
    jobId: '1',
    sender: 'customer',
    body: "Perfect. I'll be home.",
    sentAt: '2026-03-05T14:05:00Z',
    status: 'sent',
  },
  {
    id: 'm3',
    jobId: '2',
    sender: 'company',
    body: 'Just checking if you had any questions on the quote.',
    sentAt: '2026-03-05T11:30:00Z',
    status: 'sent',
  },
];
