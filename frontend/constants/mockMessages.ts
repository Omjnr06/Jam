// mock messgaes for each message page
export interface Message {
  id: string;
  senderId: 'me' | string;
  text: string;
  timestamp: string;
}

export const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    { id: 'm1', senderId: 'c1', text: 'Yo pull up to my show this weekend', timestamp: '10:02 AM' },
    { id: 'm2', senderId: 'me', text: 'For real? Where at?', timestamp: '10:05 AM' },
    { id: 'm3', senderId: 'c1', text: 'Downtown, sending you the flyer now', timestamp: '10:06 AM' },
  ],
  c2: [
    { id: 'm1', senderId: 'c2', text: 'Hi, come check out my clips', timestamp: 'Yesterday' },
    { id: 'm2', senderId: 'me', text: 'On it, your last one was fire', timestamp: 'Yesterday' },
  ],
  c3: [
    { id: 'm1', senderId: 'c3', text: 'Yo slide through Toronto sometime', timestamp: 'Mon' },
    { id: 'm2', senderId: 'me', text: 'For sure, when are you free?', timestamp: 'Mon' },
    { id: 'm3', senderId: 'c3', text: 'Probably next month, I\'ll keep you posted', timestamp: 'Mon' },
  ],
  c4: [
    { id: 'm1', senderId: 'c4', text: 'We should link for a session', timestamp: 'Sun' },
    { id: 'm2', senderId: 'me', text: 'Down, I\'ve got a loop I want your ears on', timestamp: 'Sun' },
  ],
};