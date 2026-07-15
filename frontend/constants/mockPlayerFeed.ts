import { MOCK_USERS } from './mockUsers';

// mocks for the hub feed this is the defined type
export interface PlayerClip {
  id: string;
  name: string;
  handle: string;
  location: string;
  instrument: string;
  title: string;
  description?: string;
  tags: string[];
  videoUrl: string;
}


// video url from supabase bucket from portfolio media
const VIDEO_URLS = [
  'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/RappKnishSnitches-guitar.mp4',
  'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/best-part-guitar.mov',
  'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/ironwood-drums.MP4',
];


// reating the player feed types
export const PLAYER_FEEDS: Record<string, PlayerClip[]> = {
  trending: [
    { id: '1', name: 'John', handle: '@johnkeys', location: 'Toronto', instrument: 'Keyboard', title: 'Jam Session on Creep by Radiohead', description: 'Slowed it down and added a little more space in the chorus.', tags: ['#Jazz', '#Gigs', '#Toronto'], videoUrl: VIDEO_URLS[0] },
    { id: '2', name: 'Amy', handle: '@amyguitars', location: 'Toronto', instrument: 'Guitar', title: 'Late Night Riff Session', description: 'Testing a new pedal chain, still dialing in the tone.', tags: ['#Rock', '#Toronto'], videoUrl: VIDEO_URLS[1] },
    { id: '3', name: 'Leon', handle: '@leondrums', location: 'Session', instrument: 'Drums', title: 'Pocket Groove Warmup', tags: ['#Funk', '#Session'], videoUrl: VIDEO_URLS[2] },
  ],
  local: [
    { id: '6', name: 'Sarah', handle: '@sarahacoustic', location: '1 Mile Away', instrument: 'Guitar', title: 'Front Porch Acoustic', description: 'Just messing around with an open tuning.', tags: ['#Acoustic', '#1 Mile Away'], videoUrl: VIDEO_URLS[1] },
    { id: '7', name: 'Marcus', handle: '@marcusdrums', location: '3 Miles Away', instrument: 'Drums', title: 'Metal Practice Pad Session', tags: ['#Metal', '#3 Miles Away'], videoUrl: VIDEO_URLS[2] },
  ],
  seeking: [
    { id: '8', name: 'The Void', handle: '@thevoidband', location: 'Toronto', instrument: 'Vocals', title: 'Looking for Our Missing Piece', description: 'We need a singer for our Thursday sessions, DM if interested.', tags: ['#Needs Singer', '#Gigs'], videoUrl: VIDEO_URLS[0] },
    { id: '9', name: 'Elena', handle: '@elenakeys', location: 'Studio', instrument: 'Piano', title: 'Studio Warmup, Need a Bassist', tags: ['#Needs Bassist', '#Studio'], videoUrl: VIDEO_URLS[1] },
  ],
  recommended: [
    { id: '4', name: 'Steve', handle: '@steveguitar', location: 'Compton', instrument: 'Guitar', title: 'Indie Riff Sketch', description: 'Working on a new song idea, feedback welcome.', tags: ['#Indie', '#Gigs', '#Compton'], videoUrl: VIDEO_URLS[2] },
    { id: '5', name: 'Daniel', handle: '@danielsings', location: 'L.A', instrument: 'Vocals', title: 'R&B Vocal Run Practice', tags: ['#R&B', '#Pro', '#LA'], videoUrl: VIDEO_URLS[0] },
  ],
};

Object.values(MOCK_USERS).forEach((user) => {
  const clips = [user.featuredClip, ...user.otherClips];
  PLAYER_FEEDS[`profile-${user.id}`] = clips.map((clip) => ({
    id: clip.id,
    name: user.name,
    handle: `@${user.name.toLowerCase().replace(/\s+/g, '')}`,
    location: user.instrument,
    instrument: user.instrument,
    title: clip.title,
    description: clip.description,
    tags: clip.tags,
    videoUrl: clip.videoUrl,
  }));
});