// mock hub sections, will be replaced by custom hub sections for each person
export interface Artist {
  id: string;
  name: string;
  instrument: string;
  tags: string[];
  image: string;
}

export interface HubSection {
  title: string;
  contextKey: string;
  data: Artist[];
}

const MOST_VIEWED: Artist[] = [
  { id: '1', name: 'John', instrument: 'keyboard', tags: ['#Jazz', '#Gigs', '#Toronto'], image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80' },
  { id: '2', name: 'Amy', instrument: 'guitar', tags: ['#Rock', '#Toronto'], image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80' },
  { id: '3', name: 'Leon', instrument: 'drum', tags: ['#Funk', '#Session'], image: 'https://images.unsplash.com/photo-1543791939-95a9829fcdcb?w=400&q=80' },
];

const RECOMMENDED: Artist[] = [
  { id: '4', name: 'Steve', instrument: 'guitar', tags: ['#Indie', '#Gigs', '#Compton'], image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=400&q=80' },
  { id: '5', name: 'Daniel', instrument: 'microphone-alt', tags: ['#R&B', '#Pro', '#LA'], image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80' },
];

const LOCAL_TO_YOU: Artist[] = [
  { id: '6', name: 'Sarah', instrument: 'guitar', tags: ['#Acoustic', '#1 Mile Away'], image: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=400&q=80' },
  { id: '7', name: 'Marcus', instrument: 'drum', tags: ['#Metal', '#3 Miles Away'], image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80' },
];

const SEEKING_BANDMATES: Artist[] = [
  { id: '8', name: 'The Void', instrument: 'microphone-alt', tags: ['#Needs Singer', '#Gigs'], image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80' },
  { id: '9', name: 'Elena', instrument: 'piano', tags: ['#Needs Bassist', '#Studio'], image: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=400&q=80' },
];


export const HUB_SECTIONS: HubSection[] = [
  { title: 'Most Viewed', contextKey: 'trending', data: MOST_VIEWED },
  { title: 'Local To You', contextKey: 'local', data: LOCAL_TO_YOU },
  { title: 'Seeking Bandmates', contextKey: 'seeking', data: SEEKING_BANDMATES },
  { title: 'Recommended', contextKey: 'recommended', data: RECOMMENDED },
];