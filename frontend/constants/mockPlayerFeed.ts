
import { MOCK_PEOPLE } from './mockPeople';
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

export const PLAYER_FEEDS: Record<string, PlayerClip[]> = {};

const SECTION_KEYS = ['trending', 'local', 'seeking', 'recommended'];

SECTION_KEYS.forEach((contextKey) => {
  PLAYER_FEEDS[contextKey] = MOCK_PEOPLE
    .filter((p) => p.hubSections.includes(contextKey))
    .map((p) => {
      const clip = p.clips[0];
      return {
        id: p.id,
        name: p.name,
        handle: p.handle,
        location: p.location,
        instrument: p.instrument,
        title: clip.title,
        description: clip.description,
        tags: clip.tags,
        videoUrl: clip.videoUrl,
      };
    });
});

MOCK_PEOPLE.forEach((p) => {
  PLAYER_FEEDS[`profile-${p.id}`] = p.clips.map((clip) => ({
    id: clip.id,
    name: p.name,
    handle: p.handle,
    location: p.instrument,
    instrument: p.instrument,
    title: clip.title,
    description: clip.description,
    tags: clip.tags,
    videoUrl: clip.videoUrl,
  }));
});