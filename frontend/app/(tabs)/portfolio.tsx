import React from 'react';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/useThemeStore';
import { useProfileStore } from '@/store/useProfileStore';
import ProfileHero from '@/components/ProfileHero';

export default function PortfolioScreen() {
  const { theme } = useThemeStore();
  const profile = useProfileStore();
  const featuredClip = profile.clips.find((c) => c.id === profile.featuredClipId) ?? profile.clips[0];

  return (
    <ProfileHero
      theme={theme}
      name={profile.name}
      bio={profile.bio}
      location={profile.location}
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