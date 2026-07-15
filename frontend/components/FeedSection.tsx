import React, { useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Theme } from '@/constants/theme';
import { Artist } from '@/constants/mockHubSections';

interface FeedSectionProps {
  title: string;
  data: Artist[];
  contextKey: string;
  theme: Theme;
  isLast?: boolean;
}

interface ArtistCardProps {
  artist: Artist;
  theme: Theme;
  styles: ReturnType<typeof getStyles>;
  contextKey: string;
}

const ArtistCard = ({ artist, theme, styles, contextKey }: ArtistCardProps) => (
  <TouchableOpacity 
    style={styles.cardContainer}
    onPress={() => router.push({ pathname: '/player/[id]', params: { id: artist.id, context: contextKey } })}
  >
    <View style={styles.thumbnailContainer}>
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      
      <View style={styles.playOverlay}>
        <FontAwesome5 name="play" size={24} color="#E1DCC9" />
      </View>
    </View>
    
    <View style={styles.cardHeader}>
      <Text style={styles.artistName}>{artist.name}</Text>
      <FontAwesome5 name={artist.instrument} size={16} color={theme.textPrimary} />
    </View>

    <View style={styles.tagRow}>
      {artist.tags.map((tag, index) => (
        <View key={index} style={styles.tagBadge}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  </TouchableOpacity>
);

export default function FeedSection({ title, data, contextKey, theme, isLast = false }: FeedSectionProps) {
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={isLast ? [styles.listContent, styles.lastListContent] : styles.listContent}
        renderItem={({ item }) => <ArtistCard artist={item} theme={theme} styles={styles} contextKey={contextKey} />}
      />
    </>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Bitcount',
    fontSize: 24,
    color: theme.textPrimary,
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 20, 
  },
  listContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  lastListContent: {
    paddingBottom: 40,
  },
  cardContainer: {
    width: 160, 
    marginRight: 15,
    alignItems: 'flex-start',
  },
  thumbnailContainer: {
    width: 160,
    height: 284, 
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1F150C',
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8, 
  },
  playOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(65, 45, 21, 0.6)', 
    padding: 15,
    borderRadius: 30,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  artistName: {
    fontFamily: 'Bitcount',
    fontSize: 20,
    color: theme.textPrimary,
    marginRight: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagBadge: {
    backgroundColor: theme.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tagText: {
    fontFamily: 'Inter',
    color: theme.accent,
    fontSize: 10,
    fontWeight: 'bold',
  }
});