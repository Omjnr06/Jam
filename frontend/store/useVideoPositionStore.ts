import { create } from 'zustand';

// saved the videos position
interface VideoPositionState {
  positions: Record<string, number>;
  savePosition: (url: string, seconds: number) => void;
  getPosition: (url: string) => number;
}

// makes video position avaiable
export const useVideoPositionStore = create<VideoPositionState>()((set, get) => ({
  positions: {},
  savePosition: (url, seconds) =>
    set((state) => ({ positions: { ...state.positions, [url]: seconds } })),
  getPosition: (url) => get().positions[url] ?? 0,
}));