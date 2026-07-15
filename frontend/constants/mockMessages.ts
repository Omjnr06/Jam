import { MOCK_PEOPLE } from './mockPeople';

export interface Message {
  id: string;
  senderId: 'me' | string;
  text: string;
  timestamp: string;
}

export const MOCK_MESSAGES: Record<string, Message[]> = Object.fromEntries(
  MOCK_PEOPLE
    .filter((p) => p.messages && p.messages.length > 0)
    .map((p) => [p.id, p.messages!])
);