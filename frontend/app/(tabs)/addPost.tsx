import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { VideoView } from 'expo-video';
import { FontAwesome5 } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { useResumableVideoPlayer } from '@/hooks/useResumableVideoPlayer';
import { Theme } from '@/constants/theme';
const MAX_CLIP_DURATION_SECONDS = 90;

export default function AddPostScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [originalBy, setOriginalBy] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  const player = useResumableVideoPlayer(videoUri ?? '', { muted: true });

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
      videoMaxDuration: MAX_CLIP_DURATION_SECONDS,
    });
    if (result.canceled) return;

    const asset = result.assets[0];
    const durationSeconds = (asset.duration ?? 0) / 1000;

    if (durationSeconds > MAX_CLIP_DURATION_SECONDS) {
      Alert.alert(
        'Clip Too Long',
        `Clips must be ${MAX_CLIP_DURATION_SECONDS} seconds or under. This one is ${Math.round(durationSeconds)}s — trim it and try again.`
      );
      return;
    }

    setIsCompressing(true);
    setTimeout(() => {
      setIsCompressing(false);
      setVideoUri(asset.uri);
    }, 1800);
  };

  const handlePost = () => {
    if (!videoUri || !title.trim()) return;
    setIsPosting(true);

    setTimeout(() => {
      setIsPosting(false);
      setPosted(true);
      setTimeout(() => {
        setPosted(false);
        setVideoUri(null);
        setTitle('');
        setDescription('');
        setOriginalBy('');
        setTagsInput('');
      }, 1500);
    }, 1200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.headerText}>New Clip</Text>

      <TouchableOpacity style={styles.videoPicker} onPress={pickVideo} disabled={isCompressing}>
        {videoUri ? (
          <VideoView player={player} style={styles.videoPreview} contentFit="cover" nativeControls={false} />
        ) : (
          <>
            <FontAwesome5 name="video" size={32} color={theme.textSecondary} />
            <Text style={styles.pickerText}>SELECT A CLIP</Text>
            <Text style={styles.pickerSubtext}>Up to {MAX_CLIP_DURATION_SECONDS} seconds</Text>
          </>
        )}
      </TouchableOpacity>

      <Modal visible={isCompressing} transparent={false} animationType="fade">
        <View style={styles.compressingOverlay}>
          <ActivityIndicator size="large" color="#E1DCC9" />
          <Text style={styles.compressingTitle}>Compressing your clip...</Text>
          <Text style={styles.compressingSubtext}>Please don't close the app.</Text>
        </View>
      </Modal>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>TITLE</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Jam Session on Creep by Radiohead"
          placeholderTextColor={theme.textSecondary}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>DESCRIPTION (OPTIONAL)</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Tell viewers more about what's going on in this clip..."
          placeholderTextColor={theme.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>ORIGINAL BY (OPTIONAL)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Daniel Caesar ft. H.E.R."
          placeholderTextColor={theme.textSecondary}
          value={originalBy}
          onChangeText={setOriginalBy}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>TAGS</Text>
        <TextInput
          style={styles.input}
          placeholder="#Jazz, #Toronto, #Gigs"
          placeholderTextColor={theme.textSecondary}
          value={tagsInput}
          onChangeText={setTagsInput}
        />
      </View>

      <TouchableOpacity
        style={[styles.postButton, (!videoUri || !title.trim() || isPosting || posted) && { opacity: 0.6 }]}
        onPress={handlePost}
        disabled={!videoUri || !title.trim() || isPosting || posted}
      >
        {isPosting ? (
          <ActivityIndicator color={theme.background} />
        ) : posted ? (
          <Text style={styles.postButtonText}>Posted!</Text>
        ) : (
          <Text style={styles.postButtonText}>Post Clip</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 60,
  },
  headerText: {
    fontFamily: 'Bitcount',
    fontSize: 36,
    color: theme.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  videoPicker: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: theme.surface,
    borderWidth: 2,
    borderColor: theme.accent,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 24,
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  pickerText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: theme.textSecondary,
    fontWeight: 'bold',
    marginTop: 10,
  },
  pickerSubtext: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: theme.textSecondary,
    marginTop: 4,
    opacity: 0.8,
  },
  compressingOverlay: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  compressingTitle: {
    fontFamily: 'Bitcount',
    fontSize: 22,
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center',
  },
  compressingSubtext: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Bitcount',
    fontSize: 13,
    color: theme.textPrimary,
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 15,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.accent,
    minHeight: 50,
  },
  descriptionInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: theme.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: {
    fontFamily: 'Bitcount',
    color: theme.accent,
    fontSize: 18,
  },
});