// mock statuses for the inbox (what shows in the actual inboc page)
export type RequestStatus = 'accepted' | 'pending' | 'sent';

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  status: RequestStatus;
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: 'c1', name: 'Kofi B', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', lastMessage: 'Yo pull up to my show this weekend', status: 'accepted' },
  { id: 'c2', name: 'Amara J', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', lastMessage: 'Hi, come check out my clips', status: 'accepted' },
  { id: 'c3', name: 'Nate Solano', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', lastMessage: 'Yo slide through Toronto sometime', status: 'accepted' },
  { id: 'c4', name: 'Mika Stone', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80', lastMessage: 'We should link for a session', status: 'accepted' },
  { id: 'c5', name: 'Deacon Ray', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80', lastMessage: 'Jazz bar downtown Friday?', status: 'pending' },
  { id: 'c6', name: 'Priya Anand', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&q=80', lastMessage: 'Come jam with me at church', status: 'pending' },
  { id: 'c7', name: 'Theo Marsh', avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&q=80', lastMessage: 'Studio session this weekend?', status: 'sent' },
  { id: 'c8', name: 'Lena Cho', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80', lastMessage: 'Loved your last clip, let\'s connect', status: 'sent' },
];