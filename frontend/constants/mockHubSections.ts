
import { MOCK_PEOPLE, Person } from './mockPeople';

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

const personToArtist = (p: Person): Artist => ({
  id: p.id,
  name: p.name,
  instrument: p.instrument,
  tags: p.clips[0]?.tags ?? [],
  image: p.clips[0]?.thumbnail ?? p.avatar,
});

const STATIC_SECTION_TITLES: Record<string, string> = {
  trending: 'Most Viewed',
  seeking: 'Seeking Bandmates',
  recommended: 'Recommended',
};

const STATIC_SECTIONS: HubSection[] = Object.entries(STATIC_SECTION_TITLES).map(([contextKey, title]) => ({
  title,
  contextKey,
  data: MOCK_PEOPLE.filter((p) => p.hubSections.includes(contextKey)).map(personToArtist),
}));


export const HUB_SECTIONS: HubSection[] = STATIC_SECTIONS;

export function getLocalSection(userLocation: string): HubSection {
  return {
    title: 'Local To You',
    contextKey: 'local',
    data: MOCK_PEOPLE
      .filter((p) => p.location === userLocation)
      .map(personToArtist),
  };
}