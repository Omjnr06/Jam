import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// onboarding data, to be edited to include custom instruments, genres.
const INSTRUMENTS = ['guitar', 'drum', 'microphone-alt', 'headphones', 'keyboard'];
const GENRES = ['Rock', 'Jazz', 'R&B', 'Indie', 'Metal', 'Pop', 'Funk'];
const INTENTS = ['Bandmates', 'Jam Buddies', 'Paid Gigs', 'Networking', 'Mentorship'];


const OrbitingItem = ({ item, index, totalItems, rotation }) => {
  const RADIUS = 125;
  const offsetAngle = ((2 * Math.PI) / totalItems) * index;

  const animatedOrbitStyle = useAnimatedStyle(() => {
    const currentAngle = offsetAngle + ((2 * Math.PI) / totalItems) * rotation.value;
    return {
      transform: [
        { translateX: Math.cos(currentAngle) * RADIUS },
        { translateY: Math.sin(currentAngle) * RADIUS },
      ],
    };
  });

  const isInstrument = INSTRUMENTS.includes(item);

  return (
    <Animated.View 
      style={[
        styles.orbitItem, 
        !isInstrument && styles.orbitTextItem, 
        animatedOrbitStyle
      ]}
    >
      {isInstrument ? (
        <FontAwesome5 name={item} size={20} color="#412D15" />
      ) : (
        <Text style={styles.orbitItemText} numberOfLines={1}>{item}</Text>
      )}
    </Animated.View>
  );
};

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]); 

  
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Trigger orbit when reaching the final step (now Step 5)
    if (step === 5) {
      rotation.value = withRepeat(
        withTiming(rotation.value + 1, {
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        false
      );
      
// after account creation auto route to hub but will create button most Likely so if user wants to stay in that screen slightly lnger
      const timer = setTimeout(() => {
        router.replace('/(tabs)/hub');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [step]);


  const toggleSelection = (item: string, list: string[], setList: any) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const Bubble = ({ item, isSelected, onPress, isIcon = false }) => {
    const float = useSharedValue(0);
    useEffect(() => {
      float.value = withRepeat(
        withSequence(
          withTiming(-5, { duration: 1000 + Math.random() * 500 }),
          withTiming(5, { duration: 1000 + Math.random() * 500 })
        ),
        -1,
        true
      );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: float.value }, { scale: isSelected ? 1.1 : 1 }],
      backgroundColor: isSelected ? '#412D15' : '#F5F3ED',
      borderColor: isSelected ? '#412D15' : '#E1DCC9',
    }));

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Animated.View style={[styles.bubble, animatedStyle]}>
          {isIcon ? (
            <FontAwesome5 name={item} size={28} color={isSelected ? '#E1DCC9' : '#412D15'} />
          ) : (
            <Text style={[styles.bubbleText, { color: isSelected ? '#E1DCC9' : '#412D15' }]}>{item}</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

//   for display later
  const combinedSelections = [...selectedInstruments, ...selectedGenres, ...selectedIntents];

  return (
    <View style={styles.container}>
      
{/* Name and Profile Picture Section  */}
      {step === 1 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
          <Text style={styles.headerText}>Who are you?</Text>
          
          <TouchableOpacity style={styles.profileUpload}>
            <FontAwesome5 name="camera" size={32} color="#A9A197" />
            <Text style={styles.uploadText}>ADD PHOTO</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="YOUR STAGE NAME"
            placeholderTextColor="#A9A197"
            value={name}
            onChangeText={setName}
          />
          
          <TouchableOpacity 
            style={[styles.nextBtn, !name && { opacity: 0.5 }]} 
            disabled={!name}
            onPress={() => setStep(2)}
          >
            <FontAwesome5 name="arrow-right" size={20} color="#E1DCC9" />
          </TouchableOpacity>
        </Animated.View>
      )}

{/* Instruments Section */}
      {step === 2 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
          <Text style={styles.headerText}>What do you play?</Text>
          
          <View style={styles.bubbleCloud}>
            {INSTRUMENTS.map((inst) => (
              <Bubble 
                key={inst} 
                item={inst} 
                isIcon 
                isSelected={selectedInstruments.includes(inst)}
                onPress={() => toggleSelection(inst, selectedInstruments, setSelectedInstruments)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(3)}>
            <FontAwesome5 name="arrow-right" size={20} color="#E1DCC9" />
          </TouchableOpacity>
        </Animated.View>
      )}

{/* Genres Section */}
      {step === 3 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
          <Text style={styles.headerText}>Your Vibe?</Text>
          
          <View style={styles.bubbleCloud}>
            {GENRES.map((genre) => (
              <Bubble 
                key={genre} 
                item={genre} 
                isSelected={selectedGenres.includes(genre)}
                onPress={() => toggleSelection(genre, selectedGenres, setSelectedGenres)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(4)}>
            <FontAwesome5 name="arrow-right" size={20} color="#E1DCC9" />
          </TouchableOpacity>
        </Animated.View>
      )}

{/* Intent Section */}
      {step === 4 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
          <Text style={styles.headerText}>Looking for?</Text>
          
          <View style={styles.bubbleCloud}>
            {INTENTS.map((intent) => (
              <Bubble 
                key={intent} 
                item={intent} 
                isSelected={selectedIntents.includes(intent)}
                onPress={() => toggleSelection(intent, selectedIntents, setSelectedIntents)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(5)}>
            <FontAwesome5 name="check" size={20} color="#E1DCC9" />
          </TouchableOpacity>
        </Animated.View>
      )}

{/* Summary Orbit */}
    {step === 5 && (
    <Animated.View entering={FadeIn.duration(1000)} style={styles.orbitContainer}>
        <Text style={styles.welcomeText}>Welcome to the Jam, {name}.</Text>

        <View style={styles.finalOrbitRing}>
        <View style={styles.centerProfile}>
            <FontAwesome5 name="user-alt" size={40} color="#412D15" />
        </View>

        {combinedSelections.map((item, index) => (
            <OrbitingItem 
            key={index} 
            item={item} 
            index={index} 
            totalItems={combinedSelections.length || 1} 
            rotation={rotation} 
            />
        ))}
        </View>
    </Animated.View>
    )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    color: '#412D15',
    marginBottom: 40,
    textAlign: 'center',
  },
  profileUpload: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F3ED',
    borderWidth: 2,
    borderColor: '#E1DCC9',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#A9A197',
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 18,
    backgroundColor: '#F5F3ED',
    color: '#412D15',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    width: '100%',
    textAlign: 'center',
    marginBottom: 30,
  },
  nextBtn: {
    backgroundColor: '#412D15',
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
  bubbleText: {
    fontFamily: 'Bitcount',
    fontSize: 12,
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
    color: '#412D15',
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
    backgroundColor: '#E1DCC9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  orbitItem: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F3ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1DCC9',
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
    color: '#412D15',
    textAlign: 'center',
  }
});