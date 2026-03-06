import { MOCK_JOB_IMAGES } from './jobImages.mock';
import { MOCK_JOBS } from './jobs.mock';
import { MOCK_MESSAGES } from './messages.mock';

export function getJobs() {
  return MOCK_JOBS;
}

export function getJobById(id: string) {
  return MOCK_JOBS.find(job => job.id === id);
}

export function getJobsByCustomerId(customerId: string) {
  return MOCK_JOBS.filter(job => job.customerId === customerId);
}

export function getMessagesByJobId(jobId: string) {
  return MOCK_MESSAGES.filter(m => m.jobId === jobId);
}

export function getJobImagesByJobId(jobId: string) {
  return MOCK_JOB_IMAGES.filter(img => img.jobId === jobId);
}
