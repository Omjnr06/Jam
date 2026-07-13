import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image, ScrollView, Keyboard } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeOut,
  SharedValue,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'; 
import { Camera, ArrowRight, Check, User, Guitar, Drum, MicVocal, Headphones, Piano, Music, Search, Plus } from 'lucide-react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

// For Dropdown menu 
const ALL_INSTRUMENTS = [
  'Acoustic Guitar', 'Bass Guitar', 'Cello', 'Clarinet', 'DJ', 'Drums', 
  'Electric Guitar', 'Flute', 'Harp', 'Headphones', 'Keyboard', 'Piano', 
  'Producer', 'Saxophone', 'Trumpet', 'Turntables', 'Violin', 'Vocals'
];

// For Dropdown menu
const ALL_GENRES = [
  'Acoustic', 'Alternative Rock', 'Blues', 'Classical', 'Country', 'EDM', 
  'Electronic', 'Folk', 'Funk', 'Hip Hop', 'Indie', 'Jazz', 'K-Pop', 
  'Metal', 'Pop', 'Punk', 'R&B', 'Rap', 'Reggae', 'Rock', 'Soul','Grunge','Bossa Nova',
  'Afrobeats', 'Bedroom Pop', 'Shoegaze','Bluegrass', 'Samba','Salsa', 'Other', 'Lofi'
];

const INITIAL_INSTRUMENTS = ['Guitar', 'Drums', 'Vocals', 'Headphones', 'Piano'];
const INITIAL_GENRES = ['Rock', 'Jazz', 'R&B', 'Indie', 'Metal', 'Pop', 'Funk'];
const INTENTS = ['Bandmates', 'Jam Buddies', 'Paid Gigs', 'Networking', 'Mentorship'];

interface RenderIconProps {
  name: string;
  size: number;
  color: string;
}

const RenderIcon = ({ name, size, color }: RenderIconProps) => {
  if (name.includes('Guitar')) return <Guitar size={size} color={color} />;
  if (name.includes('Drum')) return <Drum size={size} color={color} />;
  if (name.includes('Vocal')) return <MicVocal size={size} color={color} />;
  if (name.includes('Piano') || name.includes('Keyboard')) return <Piano size={size} color={color} />;
  if (name === 'Headphones' || name === 'DJ' || name === 'Producer') return <Headphones size={size} color={color} />;
  return <Music size={size} color={color} />;
};

interface OrbitingItemProps {
  item: string;
  index: number;
  totalItems: number;
  rotation: SharedValue<number>;
  instrumentList: string[];
  theme: Theme;
  styles: ReturnType<typeof getStyles>;
}

const OrbitingItem = ({ item, index, totalItems, rotation, instrumentList, theme, styles }: OrbitingItemProps) => {
  const RADIUS = 135; 
  const offsetAngle = ((2 * Math.PI) / totalItems) * index;

  const animatedOrbitStyle = useAnimatedStyle(() => {
    const currentAngle = offsetAngle + rotation.value;
    return {
      transform: [
        { translateX: Math.cos(currentAngle) * RADIUS },
        { translateY: Math.sin(currentAngle) * RADIUS },
      ],
    };
  });

  const isInstrument = instrumentList.includes(item);

  return (
    <Animated.View style={[styles.orbitWrapper, animatedOrbitStyle]}>
      {isInstrument ? (
        <View style={styles.orbitIconContainer}>
          <View style={styles.orbitItem}>
            <RenderIcon name={item} size={18} color={theme.textPrimary} />
          </View>
          <Text style={styles.orbitIconLabel} numberOfLines={1}>{item}</Text>
        </View>
      ) : (
        <View style={[styles.orbitItem, styles.orbitTextItem]}>
          <Text style={styles.orbitItemText} numberOfLines={1}>{item}</Text>
        </View>
      )}
    </Animated.View>
  );
};

export default function OnboardingScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [availableInstruments, setAvailableInstruments] = useState<string[]>(INITIAL_INSTRUMENTS);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [instrumentSearch, setInstrumentSearch] = useState('');
  const [availableGenres, setAvailableGenres] = useState<string[]>(INITIAL_GENRES);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showOtherGenreInput, setShowOtherGenreInput] = useState(false);
  const [genreSearch, setGenreSearch] = useState('');

  const [selectedIntents, setSelectedIntents] = useState<string[]>([]); 
  const rotation = useSharedValue(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 0.8,
    });
    if (!result.canceled) setProfileImage(result.assets[0].uri);
  };


  const filteredInstruments = ALL_INSTRUMENTS.filter(inst => 
    inst.toLowerCase().includes(instrumentSearch.toLowerCase()) && 
    !availableInstruments.includes(inst) 
  );

  const filteredGenres = ALL_GENRES.filter(genre => 
    genre.toLowerCase().includes(genreSearch.toLowerCase()) && 
    !availableGenres.includes(genre)
  );

  const handleSelectCustomItem = (item: string, type: 'instrument' | 'genre') => {
    if (type === 'instrument') {
      setAvailableInstruments([...availableInstruments, item]);
      setSelectedInstruments([...selectedInstruments, item]);
      setInstrumentSearch('');
      setShowOtherInput(false);
    } else {
      setAvailableGenres([...availableGenres, item]);
      setSelectedGenres([...selectedGenres, item]);
      setGenreSearch('');
      setShowOtherGenreInput(false);
    }
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (step === 5) {
      rotation.value = withRepeat(withTiming(2 * Math.PI, { duration: 10000, easing: Easing.linear }), -1, false);
      const timer = setTimeout(() => { router.replace('/(tabs)/hub'); }, 4500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const toggleSelection = (item: string, list: string[], setList: any) => {
    if (list.includes(item)) setList(list.filter((i) => i !== item));
    else setList([...list, item]);
  };

  const Bubble = ({ item, isSelected, onPress, isIcon = false }: {
    item: string;
    isSelected: boolean;
    onPress: () => void;
    isIcon?: boolean;
  }) => {
    const float = useSharedValue(0);
    useEffect(() => {
      float.value = withRepeat(
        withSequence(withTiming(-5, { duration: 1000 + Math.random() * 500 }), withTiming(5, { duration: 1000 + Math.random() * 500 })),
        -1, true
      );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: float.value }, { scale: isSelected ? 1.1 : 1 }],
      backgroundColor: isSelected ? theme.primary : theme.surface,
      borderColor: isSelected ? theme.primary : theme.accent,
    }));

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Animated.View style={[styles.bubble, animatedStyle]}>
          {isIcon ? (
            <>
              <RenderIcon name={item} size={24} color={isSelected ? theme.accent : theme.textPrimary} />
              <Text style={[styles.bubbleLabel, { color: isSelected ? theme.accent : theme.textPrimary }]} numberOfLines={1}>{item}</Text>
            </>
          ) : (
            <Text style={[styles.bubbleText, { color: isSelected ? theme.accent : theme.textPrimary }]}>{item}</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const combinedSelections = [...selectedInstruments, ...selectedGenres, ...selectedIntents];

  return (
    <View style={styles.container}>
      
      {/* Name and Photo */}
      {step === 1 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
          <Text style={styles.headerText}>Who are you?</Text>
          
          <TouchableOpacity style={styles.profileUpload} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.uploadedImage} />
            ) : (
              <>
                <Camera size={32} color={theme.textSecondary} />
                <Text style={styles.uploadText}>ADD PHOTO</Text>
              </>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="YOUR STAGE NAME"
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
          />
          
          <TouchableOpacity 
            style={[styles.nextBtn, !name && { opacity: 0.5 }]} 
            disabled={!name}
            onPress={() => setStep(2)}
          >
            <ArrowRight size={20} color={theme.accent} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Instruments */}
      {step === 2 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
          <Text style={styles.headerText}>What do you play?</Text>
          
          <View style={styles.bubbleCloud}>
            {availableInstruments.map((inst) => (
              <Bubble 
                key={inst} item={inst} isIcon 
                isSelected={selectedInstruments.includes(inst)}
                onPress={() => toggleSelection(inst, selectedInstruments, setSelectedInstruments)}
              />
            ))}
            
            {!showOtherInput && (
              <TouchableOpacity onPress={() => setShowOtherInput(true)} activeOpacity={0.8}>
                <View style={[styles.bubble, styles.otherBubble]}>
                  <Search size={24} color={theme.textPrimary} />
                  <Text style={styles.bubbleLabel}>Other</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {showOtherInput && (
            <Animated.View entering={FadeIn} style={styles.autocompleteContainer}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search instruments..."
                  placeholderTextColor={theme.textSecondary}
                  value={instrumentSearch}
                  onChangeText={setInstrumentSearch}
                  autoFocus
                />
              </View>
              
              {instrumentSearch.length > 0 && (
                <View style={styles.resultsDropdown}>
                  <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                    {filteredInstruments.map((inst) => (
                      <TouchableOpacity 
                        key={inst} 
                        style={styles.resultItem}
                        onPress={() => handleSelectCustomItem(inst, 'instrument')}
                      >
                        <Text style={styles.resultText}>{inst}</Text>
                        <Plus size={16} color={theme.textPrimary} />
                      </TouchableOpacity>
                    ))}
                    {filteredInstruments.length === 0 && (
                      <Text style={styles.noResultsText}>No instruments found.</Text>
                    )}
                  </ScrollView>
                </View>
              )}
            </Animated.View>
          )}

          <TouchableOpacity 
            style={[styles.nextBtn, selectedInstruments.length === 0 && { opacity: 0.5 }]} 
            disabled={selectedInstruments.length === 0}
            onPress={() => setStep(3)}
          >
            <ArrowRight size={20} color={theme.accent} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Genre */}
      {step === 3 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
          <Text style={styles.headerText}>Your Vibe?</Text>
          
          <View style={styles.bubbleCloud}>
            {availableGenres.map((genre) => (
              <Bubble 
                key={genre} item={genre} 
                isSelected={selectedGenres.includes(genre)}
                onPress={() => toggleSelection(genre, selectedGenres, setSelectedGenres)}
              />
            ))}

            {!showOtherGenreInput && (
              <TouchableOpacity onPress={() => setShowOtherGenreInput(true)} activeOpacity={0.8}>
                <View style={[styles.bubble, styles.otherBubble]}>
                  <Search size={24} color={theme.textPrimary} />
                  <Text style={styles.bubbleLabel}>Other</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {showOtherGenreInput && (
            <Animated.View entering={FadeIn} style={styles.autocompleteContainer}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search genres..."
                  placeholderTextColor={theme.textSecondary}
                  value={genreSearch}
                  onChangeText={setGenreSearch}
                  autoFocus
                />
              </View>
              
              {genreSearch.length > 0 && (
                <View style={styles.resultsDropdown}>
                  <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                    {filteredGenres.map((genre) => (
                      <TouchableOpacity 
                        key={genre} 
                        style={styles.resultItem}
                        onPress={() => handleSelectCustomItem(genre, 'genre')}
                      >
                        <Text style={styles.resultText}>{genre}</Text>
                        <Plus size={16} color={theme.textPrimary} />
                      </TouchableOpacity>
                    ))}
                    {filteredGenres.length === 0 && (
                      <Text style={styles.noResultsText}>No genres found.</Text>
                    )}
                  </ScrollView>
                </View>
              )}
            </Animated.View>
          )}

          <TouchableOpacity 
            style={[styles.nextBtn, selectedGenres.length === 0 && { opacity: 0.5 }]} 
            disabled={selectedGenres.length === 0}
            onPress={() => setStep(4)}
          >
            <ArrowRight size={20} color={theme.accent} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Intent */}
      {step === 4 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
          <Text style={styles.headerText}>Looking for?</Text>
          <View style={styles.bubbleCloud}>
            {INTENTS.map((intent) => (
              <Bubble 
                key={intent} item={intent} 
                isSelected={selectedIntents.includes(intent)}
                onPress={() => toggleSelection(intent, selectedIntents, setSelectedIntents)}
              />
            ))}
          </View>
          <TouchableOpacity 
            style={[styles.nextBtn, selectedIntents.length === 0 && { opacity: 0.5 }]} 
            disabled={selectedIntents.length === 0}
            onPress={() => setStep(5)}
          >
            <Check size={20} color={theme.accent} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Final Message */}
      {step === 5 && (
        <Animated.View entering={FadeIn.duration(1000)} style={styles.orbitContainer}>
          <Text style={styles.welcomeText}>Welcome to the Jam Session, {name}.</Text>

          <View style={styles.finalOrbitRing}>
            <View style={styles.centerProfile}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.centerImage} />
              ) : (
                <User size={40} color={theme.textPrimary} />
              )}
            </View>

            {combinedSelections.map((item, index) => (
              <OrbitingItem 
                key={index} item={item} index={index} 
                totalItems={combinedSelections.length || 1} 
                rotation={rotation}
                instrumentList={availableInstruments} 
                theme={theme}
                styles={styles}
              />
            ))}
          </View>
        </Animated.View>
      )}

    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  stepContainer: {
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontFamily: 'Bitcount',
    fontSize: 42,
    color: theme.textPrimary,
    marginBottom: 40,
    textAlign: 'center',
  },
  profileUpload: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.surface,
    borderWidth: 2,
    borderColor: theme.accent,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  uploadText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: theme.textSecondary,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 18,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    width: '100%',
    textAlign: 'center',
    marginBottom: 30,
  },
  autocompleteContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    zIndex: 100, 
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  searchInput: {
    fontFamily: 'Inter',
    fontSize: 16,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  resultsDropdown: {
    width: '100%',
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.accent,
    borderRadius: 12,
    marginTop: 5,
    maxHeight: 150, 
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.surface,
  },
  resultText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: theme.textPrimary,
  },
  noResultsText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: theme.textSecondary,
    padding: 16,
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: theme.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 40,
  },
  bubble: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  otherBubble: {
    backgroundColor: theme.background,
    borderColor: theme.accent,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  bubbleText: {
    fontFamily: 'Bitcount',
    fontSize: 12,
    textAlign: 'center',
  },
  bubbleLabel: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginTop: 6,
    textAlign: 'center',
  },
  orbitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    fontFamily: 'Bitcount',
    fontSize: 28,
    color: theme.textPrimary,
    marginBottom: 80,
    textAlign: 'center',
  },
  finalOrbitRing: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.accent,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    overflow: 'hidden', 
  },
  centerImage: {
    width: '100%',
    height: '100%',
  },
  orbitWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitIconLabel: {
    position: 'absolute',
    top: 46,
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.textPrimary,
    textAlign: 'center',
    width: 70,
  },
  orbitItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.accent,
  },
  orbitTextItem: {
    width: 70, 
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 5,
  },
  orbitItemText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.textPrimary,
    textAlign: 'center',
  }
});