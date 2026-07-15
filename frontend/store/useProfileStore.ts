import { create } from 'zustand';
import { PersonClip } from '@/constants/mockPeople';

const DEFAULT_CLIPS: PersonClip[] = [
  {
    id: 'me-1',
    title: 'Best Part Cover with Isa',
    description: 'Recorded live in one take, testing a new pedal setup.',
    tags: ['#RnB', '#Cover'],
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80',
    videoUrl: 'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/best-part-guitar.mov',
  },
  {
    id: 'me-2',
    title: 'Late Night Studio Session',
    description: 'Working through a new original, first draft of the hook.',
    tags: ['#Original', '#Studio'],
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    videoUrl: 'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/RappKnishSnitches-guitar.mp4',
  },
  {
    id: 'me-3',
    title: 'Acoustic Set at Ironwood',
    tags: ['#Acoustic', '#LiveSet'],
    thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80',
    videoUrl: 'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/ironwood-drums.MP4',
  },
];

const DEFAULTS = {
  name: 'Junior',
  bio: 'Guitarist blending R&B and indie textures. Always down to collab.',
  photo: null as string | null,
  location: 'Toronto',
  instruments: ['Guitar', 'Vocals'],
  genres: ['R&B', 'Indie'],
  intents: ['Bandmates', 'Jam Buddies'],
  clips: DEFAULT_CLIPS,
  featuredClipId: DEFAULT_CLIPS[0].id,
};

interface ProfileState {
  name: string;
  bio: string;
  photo: string | null;
  location: string;
  instruments: string[];
  genres: string[];
  intents: string[];
  clips: PersonClip[];
  featuredClipId: string;
  setProfile: (updates: Partial<Omit<ProfileState, 'setProfile' | 'setClips' | 'setFeaturedClip' | 'resetProfile'>>) => void;
  setClips: (clips: PersonClip[]) => void;
  setFeaturedClip: (id: string) => void;
  resetProfile: () => void;
}

// mock starting profile (swapped for the real fetched profile when backend is set up)
export const useProfileStore = create<ProfileState>()((set) => ({
  ...DEFAULTS,
  setProfile: (updates) => set((state) => ({ ...state, ...updates })),
  setClips: (clips) => set({ clips }),
  setFeaturedClip: (featuredClipId) => set({ featuredClipId }),
  resetProfile: () => set({ ...DEFAULTS }),
}));