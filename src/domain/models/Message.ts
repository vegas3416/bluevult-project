export type MessageSender = 'company' | 'customer';

export interface Message {
  id: string;

  jobId: string;

  sender: MessageSender;

  body: string;

  sentAt: string;

  status?: 'pending' | 'sent' | 'failed';
}
