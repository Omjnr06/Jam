export interface PersonClip {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  thumbnail: string;
  videoUrl: string;
}

export interface PersonMessage {
  id: string;
  senderId: 'me' | string;
  text: string;
  timestamp: string;
}

export type JamStatus = 'none' | 'sent' | 'incoming' | 'accepted';

export interface Person {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  location: string;
  instrument: string;
  instruments: string[];
  genres: string[];
  intents: string[];
  bio: string;
  jamStatus: JamStatus;
  hubSections: string[];
  clips: PersonClip[];
  messages?: PersonMessage[];
}


export const MOCK_PEOPLE: Person[] = [
  {
    id: "1",
    name: "John",
    handle: "@johnkeys",
    avatar: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80",
    location: "Toronto",
    instrument: "Keyboard",
    instruments: ["Keyboard", "Piano"],
    genres: ["Jazz"],
    intents: ["Paid Gigs"],
    bio: "Jazz keyboardist, always down for a late-night session.",
    jamStatus: "none",
    hubSections: ["trending"],
    clips: [
      { id: "1-1", title: "Jam Session on Creep by Radiohead", description: "Slowed it down and added a little more space in the chorus.", tags: ["#Jazz", "#Gigs", "#Toronto"], thumbnail: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "2",
    name: "Amy",
    handle: "@amyguitars",
    avatar: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
    location: "Toronto",
    instrument: "Guitar",
    instruments: ["Electric Guitar"],
    genres: ["Rock"],
    intents: ["Bandmates"],
    bio: "Electric guitarist chasing that classic rock tone.",
    jamStatus: "none",
    hubSections: ["trending"],
    clips: [
      { id: "2-1", title: "Late Night Riff Session", description: "Testing a new pedal chain, still dialing in the tone.", tags: ["#Rock", "#Toronto"], thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "3",
    name: "Leon",
    handle: "@leondrums",
    avatar: "https://images.unsplash.com/photo-1543791939-95a9829fcdcb?w=400&q=80",
    location: "Western University",
    instrument: "Drums",
    instruments: ["Drums"],
    genres: ["Funk"],
    intents: ["Jam Buddies"],
    bio: "Drummer in the pocket, funk and soul roots.",
    jamStatus: "none",
    hubSections: ["trending"],
    clips: [
      { id: "3-1", title: "Pocket Groove Warmup", tags: ["#Funk", "#Session"], thumbnail: "https://images.unsplash.com/photo-1543791939-95a9829fcdcb?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "4",
    name: "Steve",
    handle: "@steveguitar",
    avatar: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=400&q=80",
    location: "Compton",
    instrument: "Guitar",
    instruments: ["Acoustic Guitar"],
    genres: ["Indie"],
    intents: ["Paid Gigs"],
    bio: "Indie songwriter, always working on something new.",
    jamStatus: "none",
    hubSections: ["recommended"],
    clips: [
      { id: "4-1", title: "Indie Riff Sketch", description: "Working on a new song idea, feedback welcome.", tags: ["#Indie", "#Gigs", "#Compton"], thumbnail: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "5",
    name: "Daniel",
    handle: "@danielsings",
    avatar: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80",
    location: "L.A",
    instrument: "Vocals",
    instruments: ["Vocals"],
    genres: ["R&B"],
    intents: ["Paid Gigs", "Networking"],
    bio: "R&B vocalist working toward a debut EP.",
    jamStatus: "none",
    hubSections: ["recommended"],
    clips: [
      { id: "5-1", title: "R&B Vocal Run Practice", tags: ["#R&B", "#Pro", "#LA"], thumbnail: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "6",
    name: "Sarah",
    handle: "@sarahacoustic",
    avatar: "https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=400&q=80",
    location: "Western University",
    instrument: "Guitar",
    instruments: ["Acoustic Guitar"],
    genres: ["Acoustic"],
    intents: ["Jam Buddies"],
    bio: "Acoustic guitarist, open tunings and front-porch sessions.",
    jamStatus: "none",
    hubSections: ["local"],
    clips: [
      { id: "6-1", title: "Front Porch Acoustic", description: "Just messing around with an open tuning.", tags: ["#Acoustic", "#1 Mile Away"], thumbnail: "https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "7",
    name: "Marcus",
    handle: "@marcusdrums",
    avatar: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80",
    location: "Toronto",
    instrument: "Drums",
    instruments: ["Drums"],
    genres: ["Metal"],
    intents: ["Bandmates"],
    bio: "Metal drummer, looking for a band to lock in with.",
    jamStatus: "none",
    hubSections: ["local"],
    clips: [
      { id: "7-1", title: "Metal Practice Pad Session", tags: ["#Metal", "#3 Miles Away"], thumbnail: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "8",
    name: "The Void",
    handle: "@thevoidband",
    avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    location: "Toronto",
    instrument: "Vocals",
    instruments: ["Vocals"],
    genres: ["Rock"],
    intents: ["Bandmates"],
    bio: "Band looking for a singer to complete the lineup.",
    jamStatus: "none",
    hubSections: ["seeking"],
    clips: [
      { id: "8-1", title: "Looking for Our Missing Piece", description: "We need a singer for our Thursday sessions, DM if interested.", tags: ["#Needs Singer", "#Gigs"], thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "9",
    name: "Elena",
    handle: "@elenakeys",
    avatar: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=400&q=80",
    location: "Western University",
    instrument: "Piano",
    instruments: ["Piano"],
    genres: ["Jazz"],
    intents: ["Bandmates"],
    bio: "Pianist looking for a bassist to fill out the trio.",
    jamStatus: "none",
    hubSections: ["seeking"],
    clips: [
      { id: "9-1", title: "Studio Warmup, Need a Bassist", tags: ["#Needs Bassist", "#Studio"], thumbnail: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "10",
    name: "Kofi B",
    handle: "@kofib",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    location: "Toronto",
    instrument: "Guitar",
    instruments: ["Guitar", "Vocals"],
    genres: ["R&B", "Blues"],
    intents: ["Bandmates", "Paid Gigs"],
    bio: "Session guitarist based downtown. Always chasing the pocket.",
    jamStatus: "accepted",
    hubSections: [],
    clips: [
      { id: "10-1", title: "Live at the Show This Weekend", description: "Opening set, first time playing this room.", tags: ["#Live", "#Toronto"], thumbnail: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
      { id: "10-2", title: "Warmup Riffs", tags: ["#Practice"], thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
    messages: [
      { id: "m1", senderId: "10", text: "Yo pull up to my show this weekend", timestamp: "10:02 AM" },
      { id: "m2", senderId: "me", text: "For real? Where at?", timestamp: "10:05 AM" },
      { id: "m3", senderId: "10", text: "Downtown, sending you the flyer now", timestamp: "10:06 AM" },
    ],
  },
  {
    id: "11",
    name: "Amara J",
    handle: "@amaraj",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    location: "Toronto",
    instrument: "Vocals",
    instruments: ["Vocals"],
    genres: ["R&B", "Soul"],
    intents: ["Networking", "Paid Gigs"],
    bio: "Neo-soul vocalist, currently building out an EP.",
    jamStatus: "accepted",
    hubSections: [],
    clips: [
      { id: "11-1", title: "New Clips from the Studio", description: "Rough vocal take, still deciding on the bridge.", tags: ["#Studio", "#Original"], thumbnail: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
      { id: "11-2", title: "Acapella Snippet", tags: ["#Acapella"], thumbnail: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
    messages: [
      { id: "m1", senderId: "11", text: "Hi, come check out my clips", timestamp: "Yesterday" },
      { id: "m2", senderId: "me", text: "On it, your last one was fire", timestamp: "Yesterday" },
    ],
  },
  {
    id: "12",
    name: "Nate Solano",
    handle: "@natesolano",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    location: "Western University",
    instrument: "Bass",
    instruments: ["Bass Guitar", "Guitar"],
    genres: ["Funk", "Hip Hop"],
    intents: ["Jam Buddies"],
    bio: "Bass player, into funk and anything with a groove.",
    jamStatus: "accepted",
    hubSections: [],
    clips: [
      { id: "12-1", title: "Toronto Slide-Through Set", description: "Full band, first take, minimal editing.", tags: ["#Funk", "#Toronto"], thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
      { id: "12-2", title: "Slap Bass Practice", tags: ["#Practice"], thumbnail: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
    messages: [
      { id: "m1", senderId: "12", text: "Yo slide through Toronto sometime", timestamp: "Mon" },
      { id: "m2", senderId: "me", text: "For sure, when are you free?", timestamp: "Mon" },
      { id: "m3", senderId: "12", text: "Probably next month, I'll keep you posted", timestamp: "Mon" },
    ],
  },
  {
    id: "13",
    name: "Mika Stone",
    handle: "@mikastone",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    location: "Toronto",
    instrument: "Drums",
    instruments: ["Drums"],
    genres: ["Funk", "Jazz"],
    intents: ["Jam Buddies", "Mentorship"],
    bio: "Session drummer looking for a regular jam spot.",
    jamStatus: "accepted",
    hubSections: [],
    clips: [
      { id: "13-1", title: "Session Ideas", tags: ["#Session"], thumbnail: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
      { id: "13-2", title: "Groove Practice", tags: ["#Practice"], thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
    messages: [
      { id: "m1", senderId: "13", text: "We should link for a session", timestamp: "Sun" },
      { id: "m2", senderId: "me", text: "Down, I've got a loop I want your ears on", timestamp: "Sun" },
    ],
  },
  {
    id: "14",
    name: "Deacon Ray",
    handle: "@deaconray",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    location: "Toronto",
    instrument: "Saxophone",
    instruments: ["Saxophone"],
    genres: ["Jazz"],
    intents: ["Jam Buddies"],
    bio: "Jazz saxophonist, weekly sessions downtown.",
    jamStatus: "incoming",
    hubSections: [],
    clips: [
      { id: "14-1", title: "Jazz Bar Downtown Friday?", tags: ["#Jazz", "#Toronto"], thumbnail: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "15",
    name: "Priya Anand",
    handle: "@priyaanand",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&q=80",
    location: "Toronto",
    instrument: "Vocals",
    instruments: ["Vocals"],
    genres: ["Gospel"],
    intents: ["Mentorship"],
    bio: "Choir director, always looking to jam.",
    jamStatus: "incoming",
    hubSections: [],
    clips: [
      { id: "15-1", title: "Come Jam with Me at Church", tags: ["#Gospel"], thumbnail: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "16",
    name: "Theo Marsh",
    handle: "@theomarsh",
    avatar: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&q=80",
    location: "Western University",
    instrument: "Guitar",
    instruments: ["Electric Guitar"],
    genres: ["Rock"],
    intents: ["Paid Gigs"],
    bio: "Studio guitarist, open to session work.",
    jamStatus: "sent",
    hubSections: [],
    clips: [
      { id: "16-1", title: "Studio Session This Weekend?", tags: ["#Studio"], thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
  {
    id: "17",
    name: "Lena Cho",
    handle: "@lenacho",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
    location: "Toronto",
    instrument: "Piano",
    instruments: ["Piano"],
    genres: ["Indie"],
    intents: ["Networking"],
    bio: "Pianist and producer, into indie textures.",
    jamStatus: "sent",
    hubSections: [],
    clips: [
      { id: "17-1", title: "Loved Your Last Clip, Let's Connect", tags: ["#Indie"], thumbnail: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=400&q=80", videoUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    ],
  },
];

export const MOCK_PEOPLE_BY_ID: Record<string, Person> = Object.fromEntries(
  MOCK_PEOPLE.map((p) => [p.id, p])
);


export const ALL_LOCATIONS: string[] = Array.from(new Set(MOCK_PEOPLE.map((p) => p.location))).sort();