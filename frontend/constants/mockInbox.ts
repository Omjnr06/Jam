
import { MOCK_PEOPLE } from './mockPeople';

export type RequestStatus = 'accepted' | 'pending' | 'sent';

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  status: RequestStatus;
}

const STATUS_MAP: Record<string, RequestStatus> = {
  accepted: 'accepted',
  incoming: 'pending',
  sent: 'sent',
};

export const MOCK_CONVERSATIONS: Conversation[] = MOCK_PEOPLE
  .filter((p) => p.jamStatus !== 'none')
  .map((p) => ({
    id: p.id,
    name: p.name,
    avatar: p.avatar,
    lastMessage: p.messages?.[p.messages.length - 1]?.text ?? '',
    status: STATUS_MAP[p.jamStatus],
  }));