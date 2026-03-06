export type CalendarEventType = 'job' | 'followup' | 'reminder' | 'meeting';

export interface CalendarEvent {
  id: string;

  jobId?: string;

  title: string;

  type: CalendarEventType;

  startsAt: string;
  endsAt?: string;

  createdAt: string;
}
