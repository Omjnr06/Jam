// featured clip store for making the featured clip available everywhere
import { create } from 'zustand';

interface FeaturedClipState {
  featuredClipId: string;
  setFeaturedClip: (id: string) => void;
}

export const useFeaturedClipStore = create<FeaturedClipState>()((set) => ({
  featuredClipId: '1',
  setFeaturedClip: (id) => set({ featuredClipId: id }),
}));