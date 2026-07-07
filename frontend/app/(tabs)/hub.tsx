import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SpinningLogo from '../../components/SpinningLogo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// mock data (removed when backend is set up)
// need to change icon useage, fontawesome free tier does not include pianos
const MOST_VIEWED = [
  { id: '1', name: 'John', instrument: 'keyboard', tags: ['#Jazz', '#Gigs', '#Toronto'], image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80' },
  { id: '2', name: 'Amy', instrument: 'guitar', tags: ['#Rock', '#Toronto'], image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80' },
  { id: '3', name: 'Leon', instrument: 'drum', tags: ['#Funk', '#Session'], image: 'https://images.unsplash.com/photo-1543791939-95a9829fcdcb?w=400&q=80' },
];

const RECOMMENDED = [
  { id: '4', name: 'Steve', instrument: 'guitar', tags: ['#Indie', '#Gigs', '#Compton'], image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=400&q=80' },
  { id: '5', name: 'Daniel', instrument: 'microphone-alt', tags: ['#R&B', '#Pro', '#LA'], image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?w=400&q=80' },
];

const LOCAL_TO_YOU = [
  { id: '6', name: 'Sarah', instrument: 'guitar', tags: ['#Acoustic', '#1 Mile Away'], image: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=400&q=80' },
  { id: '7', name: 'Marcus', instrument: 'drum', tags: ['#Metal', '#3 Miles Away'], image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80' },
];
const SEEKING_BANDMATES = [
  { id: '8', name: 'The Void', instrument: 'microphone-alt', tags: ['#Needs Singer', '#Gigs'], image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80' },
  { id: '9', name: 'Elena', instrument: 'piano', tags: ['#Needs Bassist', '#Studio'], image: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=400&q=80' },
];

// video card
const ArtistCard = ({ artist }) => (
  <TouchableOpacity style={styles.cardContainer}>
    <View style={styles.thumbnailContainer}>
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      
      <View style={styles.playOverlay}>
        <FontAwesome5 name="play" size={24} color="#E1DCC9" />
      </View>
    </View>
    
    <View style={styles.cardHeader}>
      <Text style={styles.artistName}>{artist.name}</Text>
      <FontAwesome5 name={artist.instrument} size={16} color="#412D15" />
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

export default function HubScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.logoText}>JAM</Text>
          
          <View style={styles.avatarWrapper}>
            <SpinningLogo scale={0.4} speed={1200}>
              <FontAwesome5 name="user-circle" size={80} color="#412D15" solid />
            </SpinningLogo>
          </View>
        </View>
        <View style={styles.searchBar}>
          <FontAwesome5 name="search" size={14} color="#412D15" />
          <TextInput 
            style={styles.searchInput}
            placeholder="SEARCH FOR TAGS, LOCATIONS..."
            placeholderTextColor="#A9A197"
          />
        </View>
      </View>

      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Most Viewed</Text>
        <FlatList
          data={MOST_VIEWED}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <ArtistCard artist={item} />}
        />

        <Text style={styles.sectionTitle}>Local To You</Text>
        <FlatList
          data={LOCAL_TO_YOU}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <ArtistCard artist={item} />}
        />

        <Text style={styles.sectionTitle}>Seeking Bandmates</Text>
        <FlatList
          data={SEEKING_BANDMATES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <ArtistCard artist={item} />}
        />

        <Text style={styles.sectionTitle}>Recommended</Text>
        <FlatList
          data={RECOMMENDED}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: 40 }]}
          renderItem={({ item }) => <ArtistCard artist={item} />}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 55, 
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
    zIndex: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Bitcount',
    fontSize: 48,
    color: '#412D15',
  },
  avatarWrapper: {
    width: 85, 
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#F5F3ED', 
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    marginTop: 5, 
    borderWidth: 1,
    borderColor: '#E1DCC9',
  },
  searchInput: {
    fontFamily: 'Bitcount',
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
    color: '#412D15',
  },
  feed: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Bitcount',
    fontSize: 24,
    color: '#412D15',
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 20, 
  },
  listContent: {
    paddingLeft: 20,
    paddingRight: 10,
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
    color: '#412D15',
    marginRight: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagBadge: {
    backgroundColor: '#412D15',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tagText: {
    fontFamily: 'Inter',
    color: '#E1DCC9',
    fontSize: 10,
    fontWeight: 'bold',
  }
});