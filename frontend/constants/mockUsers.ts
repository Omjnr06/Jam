// mock for my clips
export interface UserClip {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  thumbnail: string;
  videoUrl: string;
}

// mock for user profile
export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  instrument: string;
  instruments: string[];
  genres: string[];
  intents: string[];
  bio: string;
  jamRequestStatus: 'none' | 'sent' | 'incoming' | 'accepted';
  featuredClip: UserClip;
  otherClips: UserClip[];
}

// mock urls from my supabase bucket for my portfolio media
const VIDEO_URLS = [
  'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/RappKnishSnitches-guitar.mp4',
  'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/best-part-guitar.mov',
  'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/ironwood-drums.MP4',
];

// creating the 4 users dictionary types 
export const MOCK_USERS: Record<string, UserProfile> = {
  c1: {
    id: 'c1',
    name: 'Kofi B',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    instrument: 'Guitar',
    instruments: ['Guitar', 'Vocals'],
    genres: ['R&B', 'Blues'],
    intents: ['Bandmates', 'Paid Gigs'],
    bio: 'Session guitarist based downtown. Always chasing the pocket.',
    jamRequestStatus: 'accepted',
    featuredClip: { id: 'c1-1', title: 'Live at the Show This Weekend', description: 'Opening set, first time playing this room.', tags: ['#Live', '#Toronto'], thumbnail: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80', videoUrl: VIDEO_URLS[1] },
    otherClips: [
      { id: 'c1-2', title: 'Warmup Riffs', tags: ['#Practice'], thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', videoUrl: VIDEO_URLS[0] },
    ],
  },
  c2: {
    id: 'c2',
    name: 'Amara J',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    instrument: 'Vocals',
    instruments: ['Vocals'],
    genres: ['R&B', 'Soul'],
    intents: ['Networking', 'Paid Gigs'],
    bio: 'Neo-soul vocalist, currently building out an EP.',
    jamRequestStatus: 'accepted',
    featuredClip: { id: 'c2-1', title: 'New Clips from the Studio', description: 'Rough vocal take, still deciding on the bridge.', tags: ['#Studio', '#Original'], thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80', videoUrl: VIDEO_URLS[1] },
    otherClips: [
      { id: 'c2-2', title: 'Acapella Snippet', tags: ['#Acapella'], thumbnail: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80', videoUrl: VIDEO_URLS[2] },
    ],
  },
  c3: {
    id: 'c3',
    name: 'Nate Solano',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    instrument: 'Bass',
    instruments: ['Bass', 'Guitar'],
    genres: ['Funk', 'Hip Hop'],
    intents: ['Jam Buddies'],
    bio: 'Bass player, into funk and anything with a groove.',
    jamRequestStatus: 'accepted',
    featuredClip: { id: 'c3-1', title: 'Toronto Slide-Through Set', description: 'Full band, first take, minimal editing.', tags: ['#Funk', '#Toronto'], thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', videoUrl: VIDEO_URLS[0] },
    otherClips: [
      { id: 'c3-2', title: 'Slap Bass Practice', tags: ['#Practice'], thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80', videoUrl: VIDEO_URLS[2] },
    ],
  },
  c4: {
    id: 'c4',
    name: 'Mika Stone',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    instrument: 'Drums',
    instruments: ['Drums'],
    genres: ['Funk', 'Jazz'],
    intents: ['Jam Buddies', 'Mentorship'],
    bio: 'Session drummer looking for a regular jam spot.',
    jamRequestStatus: 'accepted',
    featuredClip: { id: 'c4-1', title: 'Session Ideas', tags: ['#Session'], thumbnail: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80', videoUrl: VIDEO_URLS[2] },
    otherClips: [
      { id: 'c4-2', title: 'Groove Practice', tags: ['#Practice'], thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', videoUrl: VIDEO_URLS[1] },
    ],
  },
};