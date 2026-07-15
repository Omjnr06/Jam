import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  TouchableOpacity, 
  Pressable,
  PanResponder,
  SafeAreaView,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useLocalSearchParams, router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { useVideoPositionStore } from '@/store/useVideoPositionStore';
import { Theme } from '@/constants/theme';
import { PLAYER_FEEDS, PlayerClip } from '@/constants/mockPlayerFeed';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

interface PlayerVideoItemProps {
  item: PlayerClip;
  isActive: boolean;
  isPaused: boolean;
  isScreenFocused: boolean;
  styles: ReturnType<typeof getStyles>;
  onOpenJamModal: () => void;
}

const PlayerVideoItem = ({ item, isActive, isPaused, isScreenFocused, styles, onOpenJamModal }: PlayerVideoItemProps) => {
  const { savePosition, getPosition } = useVideoPositionStore();
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const dragProgressRef = useRef(0);
  const trackWidthRef = useRef(0);
  const player = useVideoPlayer(item.videoUrl, (player) => {
    player.loop = true;
  });

  const updateDrag = (locationX: number) => {
    const width = trackWidthRef.current || 1;
    const ratio = Math.min(Math.max(locationX / width, 0), 1);
    dragProgressRef.current = ratio;
    setDragProgress(ratio);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        setIsDragging(true);
        updateDrag(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        updateDrag(evt.nativeEvent.locationX);
      },
      onPanResponderRelease: () => {
        try {
          if (player.duration > 0) {
            player.currentTime = dragProgressRef.current * player.duration;
          }
        } catch (e) {

        }
        setIsDragging(false);
      },
    })
  ).current;

  useEffect(() => {
    const shouldPlay = isActive && !isPaused && isScreenFocused && !isManuallyPaused;
    try {
      if (shouldPlay) {
        const resumeAt = getPosition(item.videoUrl);
        if (resumeAt > 0) player.currentTime = resumeAt;
        player.play();
      } else {
        savePosition(item.videoUrl, player.currentTime);
        player.pause();
      }
    } catch (e) {

    }
  }, [isActive, isPaused, isScreenFocused, isManuallyPaused, player]);


  useEffect(() => {
    if (!isActive) setIsManuallyPaused(false);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      try {
        const duration = player.duration;
        if (duration > 0) setProgress(player.currentTime / duration);
      } catch (e) {

      }
    }, 200);
    return () => clearInterval(interval);
  }, [isActive, player]);

  return (
    <View style={styles.videoContainer}>
      <Pressable style={StyleSheet.absoluteFillObject} onPress={() => setIsManuallyPaused((p) => !p)}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          nativeControls={false}
        />
      </Pressable>

      {isManuallyPaused && (
        <View style={styles.centerPlayWrapper} pointerEvents="none">
          <View style={styles.centerPlayCircle}>
            <Ionicons name="play" size={32} color="#FFFFFF" />
          </View>
        </View>
      )}

      {/* Top Left: Back + Name / Handle */}
      <SafeAreaView style={styles.topLeft} pointerEvents="box-none">
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nameBadge}
          onPress={() => router.push({ pathname: '/user/[id]', params: { id: item.id } })}
        >
          <Text style={styles.handleText}>{item.handle}</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Top Right: Location */}
      <SafeAreaView style={styles.topRight} pointerEvents="box-none">
        <View style={styles.locationBadge}>
          <Ionicons name="location-sharp" size={14} color="#FFFFFF" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </SafeAreaView>

      {/* Bottom Left: Instrument, Title, Description & Tags */}
      <SafeAreaView style={styles.bottomLeft} pointerEvents="box-none">
        <View style={styles.instrumentRow}>
          <FontAwesome5 name="music" size={10} color="rgba(255,255,255,0.75)" />
          <Text style={styles.instrumentEyebrow}>{item.instrument}</Text>
        </View>
        <Text style={styles.titleText}>{item.title}</Text>
        {!!item.description && (
          <Text style={styles.descriptionText} numberOfLines={2}>{item.description}</Text>
        )}
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, i) => (
            <View key={i} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>

      {/* Bottom Right: Jam Request Action */}
      <SafeAreaView style={styles.bottomRight} pointerEvents="box-none">
        <TouchableOpacity style={styles.jamButton} onPress={onOpenJamModal}>
          <View style={styles.jamIconContainer}>
            <FontAwesome5 name="hand-rock" size={24} color="#412D15" />
          </View>
          <Text style={styles.jamButtonText}>Jam</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Progress bar */}
      <View
        style={styles.progressTouchArea}
        onLayout={(e) => { trackWidthRef.current = e.nativeEvent.layout.width; }}
        {...panResponder.panHandlers}
      >
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(isDragging ? dragProgress : progress) * 100}%` },
            ]}
          />
        </View>
        <View
          style={[
            styles.progressThumb,
            { left: `${(isDragging ? dragProgress : progress) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
};

export default function PlayerScreen() {
  const { theme } = useThemeStore();
  const isScreenFocused = useIsFocused();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { id, context } = useLocalSearchParams() as { id: string; context: string };

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [feedData, setFeedData] = useState<PlayerClip[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  const [isJamModalVisible, setJamModalVisible] = useState(false);
  const [jamMessage, setJamMessage] = useState('');
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const data = PLAYER_FEEDS[context || 'trending'] || PLAYER_FEEDS['trending'];
    const startIndex = data.findIndex((item) => item.id === id);

    setFeedData(data);
    setActiveVideoIndex(startIndex !== -1 ? startIndex : 0);
    setIsInitializing(false);
  }, [id, context]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

  const handleSendJamRequest = () => {
    setIsSendingRequest(true);
    // Simulate API Call to backend
    setTimeout(() => {
      setIsSendingRequest(false);
      setRequestSent(true);
      setTimeout(() => {
        setJamModalVisible(false);
        setRequestSent(false);
        setJamMessage('');
      }, 1500);
    }, 1200);
  };

  if (isInitializing) {
    return (
      <View style={[styles.container, styles.centerAll]}>
        <ActivityIndicator size="large" color={theme.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={({ item, index }) => (
          <PlayerVideoItem
            item={item}
            isActive={activeVideoIndex === index}
            isPaused={isJamModalVisible}
            isScreenFocused={isScreenFocused}
            styles={styles}
            onOpenJamModal={() => setJamModalVisible(true)}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        decelerationRate="fast"
        disableIntervalMomentum
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        initialScrollIndex={activeVideoIndex}
        getItemLayout={(data, index) => ({ length: WINDOW_HEIGHT, offset: WINDOW_HEIGHT * index, index })}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews
      />

      {/* Jam Request Bottom Sheet Modal */}
      <Modal visible={isJamModalVisible} transparent animationType="slide">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableOpacity 
            style={styles.modalDismissArea} 
            activeOpacity={1} 
            onPress={() => setJamModalVisible(false)} 
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Send Jam Request</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Hey! Love your style, want to link up?"
              placeholderTextColor={theme.textSecondary}
              multiline
              value={jamMessage}
              onChangeText={setJamMessage}
            />

            <TouchableOpacity 
              style={[styles.modalSubmitButton, requestSent && styles.modalSubmitSuccess]}
              onPress={handleSendJamRequest}
              disabled={isSendingRequest || requestSent}
            >
              {isSendingRequest ? (
                <ActivityIndicator color={theme.background} />
              ) : requestSent ? (
                <Ionicons name="checkmark" size={24} color={theme.background} />
              ) : (
                <Text style={styles.modalSubmitText}>Send Request</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerAll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },

  topLeft: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  nameBadge: {
    backgroundColor: 'rgba(65, 45, 21, 0.55)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  handleText: {
    fontFamily: 'Bitcount',
    color: '#FFFFFF',
    fontSize: 16,
  },
  topRight: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 45, 21, 0.55)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    maxWidth: '70%',
  },
  instrumentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  instrumentEyebrow: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titleText: {
    fontFamily: 'Bitcount',
    fontSize: 24,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 4,
  },
  descriptionText: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagBadge: {
    backgroundColor: 'rgba(65, 45, 21, 0.55)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1DCC9',
  },
  tagText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#E1DCC9',
    fontWeight: '600',
  },
  bottomRight: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
  },
  jamButton: {
    alignItems: 'center',
  },
  jamIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E1DCC9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  jamButtonText: {
    fontFamily: 'Bitcount',
    color: '#FFFFFF',
    fontSize: 14,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  centerPlayWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPlayCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(65, 45, 21, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTouchArea: {
    position: 'absolute',
    bottom: 175,
    left: 20,
    right: 20,
    height: 24,
    justifyContent: 'center',
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E1DCC9',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: '50%',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E1DCC9',
    borderWidth: 2,
    borderColor: '#412D15',
    marginTop: -7,
    marginLeft: -7,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalDismissArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: theme.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: theme.textSecondary,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.5,
  },
  modalTitle: {
    fontFamily: 'Bitcount',
    fontSize: 24,
    color: theme.textPrimary,
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: theme.background,
    borderRadius: 12,
    padding: 16,
    color: theme.textPrimary,
    fontFamily: 'Inter',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  modalSubmitButton: {
    backgroundColor: theme.primary,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubmitSuccess: {
    backgroundColor: '#4CAF50',
  },
  modalSubmitText: {
    fontFamily: 'Bitcount',
    fontSize: 18,
    color: theme.background,
  }
});