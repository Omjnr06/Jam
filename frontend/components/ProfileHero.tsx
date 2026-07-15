import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { VideoView } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useResumableVideoPlayer } from '@/hooks/useResumableVideoPlayer';
import { Theme } from '@/constants/theme';

export type JamStatus = 'none' | 'sent' | 'incoming' | 'accepted';

interface ClipThumb {
  id: string;
  thumbnail: string;
}

interface ProfileHeroProps {
  theme: Theme;
  name: string;
  bio?: string;
  featuredVideoUrl: string;
  featuredCaption?: string;
  instruments?: string[];
  genres?: string[];
  primaryIntent?: string;
  onBack?: () => void;
  onMoreOptions?: () => void;
  isCurrentUser: boolean;
  onManageClips?: () => void;
  onViewNetwork?: () => void;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onFeaturedEditPress?: () => void;
  jamStatus?: JamStatus;
  onJamAction?: () => void;
  otherClips?: ClipThumb[];
  onClipPress?: (clipId: string) => void;
}

export default function ProfileHero({
  theme,
  name,
  bio,
  featuredVideoUrl,
  featuredCaption,
  instruments,
  genres,
  primaryIntent,
  onBack,
  onMoreOptions,
  isCurrentUser,
  onManageClips,
  onViewNetwork,
  onEditProfile,
  onSettings,
  onFeaturedEditPress,
  jamStatus = 'none',
  onJamAction,
  otherClips,
  onClipPress,
}: ProfileHeroProps) {
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [isMuted, setIsMuted] = useState(false);

  const player = useResumableVideoPlayer(featuredVideoUrl, { muted: isMuted });

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    player.muted = next;
  };

  const actionLabel =
    jamStatus === 'none' ? 'Jam Request' :
    jamStatus === 'sent' ? 'Pending' :
    jamStatus === 'incoming' ? 'Accept' :
    'Message';

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={[StyleSheet.absoluteFillObject, styles.video]}
        contentFit="cover"
        nativeControls={false}
      />

{/* Vertical Gradient */}
      <LinearGradient
        colors={['transparent', 'rgba(2,2,2,0.55)', theme.surface]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />


{/* Horizontal Gradient */}
      {/* <LinearGradient
        colors={['#020202', 'rgba(2,2,2,0.5)', 'transparent']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFillObject}
      /> */}

      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity style={styles.iconButton} onPress={onBack}>
            <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFillObject} />
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <Text style={styles.logoText}>JAM</Text>
        )}

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleMute}>
            <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFillObject} />
            <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={20} color="#FFFFFF" />
          </TouchableOpacity>
          {onMoreOptions && (
            <TouchableOpacity style={[styles.iconButton, { marginLeft: 10 }]} onPress={onMoreOptions}>
              <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFillObject} />
              <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isCurrentUser && featuredCaption && (
        <TouchableOpacity style={styles.featuredBadge} onPress={onFeaturedEditPress}>
          <Text style={styles.featuredBadgeText}>Featured: {featuredCaption}</Text>
          <Ionicons name="pencil" size={12} color="#412D15" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        {!isCurrentUser && otherClips && otherClips.length > 0 && (
          <FlatList
            data={otherClips}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.clipsRow}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.clipThumb} onPress={() => onClipPress?.(item.id)}>
                <Image source={{ uri: item.thumbnail }} style={styles.clipThumbImage} />
              </TouchableOpacity>
            )}
          />
        )}

        <Text style={styles.userTitle}>{isCurrentUser ? 'This Is You' : `This Is ${name}`}</Text>
        {!!bio && <Text style={styles.bio}>{bio}</Text>}

        {(primaryIntent || (instruments && instruments.length > 0) || (genres && genres.length > 0)) && (
          <View style={styles.identityRow}>
            {primaryIntent && (
              <View style={styles.intentBadge}>
                <Ionicons name="flag" size={10} color="#412D15" />
                <Text style={styles.intentBadgeText}>{primaryIntent}</Text>
              </View>
            )}
            {instruments?.map((item) => (
              <View key={`i-${item}`} style={styles.identityBadge}>
                <Text style={styles.identityBadgeText}>{item}</Text>
              </View>
            ))}
            {genres?.map((item) => (
              <View key={`g-${item}`} style={styles.identityBadge}>
                <Text style={styles.identityBadgeText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {isCurrentUser ? (
          <>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.actionButton} onPress={onManageClips}>
                <Text style={styles.actionButtonText}>Manage Clips</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={onViewNetwork}>
                <Text style={styles.actionButtonText}>View Network</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.actionButton} onPress={onEditProfile}>
                <Text style={styles.actionButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={onSettings}>
                <Text style={styles.actionButtonText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.actionButtonFull, jamStatus === 'sent' && styles.actionButtonDisabled]}
            onPress={onJamAction}
            disabled={jamStatus === 'sent'}
          >
            <Text style={styles.actionButtonText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  video: { opacity: 0.85 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  headerRight: { flexDirection: 'row' },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { fontFamily: 'Bitcount', fontSize: 40, color: '#FFFFFF' },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(225,220,201,0.85)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  featuredBadgeText: { fontFamily: 'Inter', fontSize: 12, color: '#412D15', fontWeight: '600' },
  content: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 24, paddingBottom: 40 },
  userTitle: {
    fontFamily: 'Bitcount',
    fontSize: 34,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  bio: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  identityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  intentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(225,220,201,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  intentBadgeText: { fontFamily: 'Inter', fontSize: 11, fontWeight: '700', color: '#412D15' },
  identityBadge: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  identityBadgeText: { fontFamily: 'Inter', fontSize: 11, fontWeight: '600', color: '#FFFFFF' },
  buttonRow: { flexDirection: 'row', gap: 14, marginBottom: 14, justifyContent: 'center' },
  actionButton: {
    backgroundColor: 'rgba(225,220,201,0.9)',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 24,
  },
  actionButtonFull: {
    backgroundColor: 'rgba(225,220,201,0.9)',
    paddingVertical: 14,
    borderRadius: 26,
    alignItems: 'center',
    marginBottom: 24,
  },
  actionButtonDisabled: { opacity: 0.6 },
  actionButtonText: { fontFamily: 'Bitcount', fontSize: 14, color: '#412D15' },
  clipsRow: { gap: 10, marginBottom: 16 },
  clipThumb: { width: 72, height: 100, borderRadius: 10, overflow: 'hidden' },
  clipThumbImage: { width: '100%', height: '100%' },
});