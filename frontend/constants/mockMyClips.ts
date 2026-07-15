// mock for clips and all the data in the clips
export interface MyClip {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  thumbnail: string;
  videoUrl: string;
}

export const MOCK_MY_CLIPS: MyClip[] = [
  {
    id: '1',
    title: 'Best Part Cover with Isa',
    description: 'Recorded live in one take, testing a new pedal setup.',
    tags: ['#RnB', '#Cover'],
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80',
    videoUrl: 'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/best-part-guitar.mov',
  },
  {
    id: '2',
    title: 'Late Night Studio Session',
    description: 'Working through a new original, first draft of the hook.',
    tags: ['#Original', '#Studio'],
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    videoUrl: 'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/RappKnishSnitches-guitar.mp4',
  },
  {
    id: '3',
    title: 'Acoustic Set at Ironwood',
    description: undefined,
    tags: ['#Acoustic', '#LiveSet'],
    thumbnail: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80',
    videoUrl: 'https://cgfgtbyzpztzfuqdqnzh.supabase.co/storage/v1/object/public/portfolio-media/ironwood-drums.MP4',
  },
];