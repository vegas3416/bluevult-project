import type { JobImage } from '@/domain/models';

export const MOCK_JOB_IMAGES: JobImage[] = [
  {
    id: 'img1',
    jobId: '1',
    url: 'https://picsum.photos/800/600?1',
    caption: 'Front house view',
    createdAt: '2026-03-05T12:00:00Z',
  },
  {
    id: 'img2',
    jobId: '1',
    url: 'https://picsum.photos/800/600?2',
    caption: 'Roofline',
    createdAt: '2026-03-05T12:10:00Z',
  },
  {
    id: 'img3',
    jobId: '2',
    url: 'https://picsum.photos/800/600?3',
    caption: 'Estimate photo',
    createdAt: '2026-03-04T16:00:00Z',
  },
];
