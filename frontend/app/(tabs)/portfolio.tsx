import React from 'react';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/useThemeStore';
import { useFeaturedClipStore } from '@/store/useFeaturedClipStore';
import { useProfileStore } from '@/store/useProfileStore';
import { MOCK_MY_CLIPS } from '@/constants/mockMyClips';
import ProfileHero from '@/components/ProfileHero';

export default function PortfolioScreen() {
  const { theme } = useThemeStore();
  const { featuredClipId } = useFeaturedClipStore();
  const profile = useProfileStore();
  const featuredClip = MOCK_MY_CLIPS.find((c) => c.id === featuredClipId) ?? MOCK_MY_CLIPS[0];

  return (
    <ProfileHero
      theme={theme}
      name={profile.name}
      bio={profile.bio}
      instruments={profile.instruments}
      genres={profile.genres}
      primaryIntent={profile.intents[0]}
      isCurrentUser
      featuredVideoUrl={featuredClip.videoUrl}
      featuredCaption={featuredClip.title}
      onFeaturedEditPress={() => router.push('/manage-clips')}
      onManageClips={() => router.push('/manage-clips')}
      onViewNetwork={() => router.push('/network')}
      onEditProfile={() => router.push('/edit-profile')}
      onSettings={() => router.push('/settings')}
    />
  );
}