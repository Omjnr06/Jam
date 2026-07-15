// makes profile available everywhere. to be replaced by use of endpoint from backend
import { create } from 'zustand';

interface ProfileState {
  name: string;
  bio: string;
  photo: string | null;
  instruments: string[];
  genres: string[];
  intents: string[];
  setProfile: (updates: Partial<Omit<ProfileState, 'setProfile'>>) => void;
}

export const useProfileStore = create<ProfileState>()((set) => ({
  name: 'Junior',
  bio: 'Guitarist blending R&B and indie textures. Always down to collab.',
  photo: null,
  instruments: ['Guitar', 'Vocals'],
  genres: ['R&B', 'Indie'],
  intents: ['Bandmates', 'Jam Buddies'],
  setProfile: (updates) => set((state) => ({ ...state, ...updates })),
}));