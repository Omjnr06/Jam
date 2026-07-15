import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { MOCK_USERS, UserClip } from '@/constants/mockUsers';
import ProfileHero, { JamStatus } from '@/components/ProfileHero';

interface FallbackParams {
  id?: string;
  name?: string;
  videoUrl?: string;
  instrument?: string;
}

export default function UserProfileScreen() {
  const { theme } = useThemeStore();
  const params = useLocalSearchParams() as FallbackParams;
  const { id } = params;

  const richProfile = id ? MOCK_USERS[id] : undefined;
  const profile = richProfile ?? {
    id: id ?? 'unknown',
    name: params.name ?? 'Unknown Artist',
    bio: '',
    instruments: params.instrument ? [params.instrument] : ([] as string[]),
    genres: [] as string[],
    intents: [] as string[],
    jamRequestStatus: 'none' as const,
    featuredClip: {
      id: 'fallback',
      title: '',
      tags: [],
      thumbnail: '',
      videoUrl: params.videoUrl ?? '',
    },
    otherClips: [] as UserClip[],
  };

  const [status, setStatus] = useState<JamStatus>(profile.jamRequestStatus);
  const [isJamModalVisible, setJamModalVisible] = useState(false);
  const [jamMessage, setJamMessage] = useState('');
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleSendJamRequest = () => {
    setIsSendingRequest(true);
    setTimeout(() => {
      setIsSendingRequest(false);
      setRequestSent(true);
      setTimeout(() => {
        setJamModalVisible(false);
        setRequestSent(false);
        setJamMessage('');
        setStatus('sent');
      }, 1500);
    }, 1200);
  };

  const handleMoreOptions = () => {
    Alert.alert(profile.name, undefined, [
      { text: 'Report', style: 'destructive', onPress: () => Alert.alert('Reported', `${profile.name} has been reported.`) },
      { text: 'Block', style: 'destructive', onPress: () => Alert.alert('Blocked', `${profile.name} has been blocked.`) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleJamAction = () => {
    if (status === 'none') setJamModalVisible(true);
    if (status === 'incoming') {
      setStatus('accepted');
      Alert.alert('Request Accepted', `You and ${profile.name} are now connected.`);
    }
    if (status === 'accepted') router.push({ pathname: '/messages/[id]', params: { id: profile.id } });
  };

  return (
    <View style={{ flex: 1 }}>
      <ProfileHero
        theme={theme}
        name={profile.name}
        bio={profile.bio}
        instruments={profile.instruments}
        genres={profile.genres}
        primaryIntent={profile.intents[0]}
        isCurrentUser={false}
        featuredVideoUrl={profile.featuredClip.videoUrl}
        onBack={() => router.back()}
        onMoreOptions={handleMoreOptions}
        jamStatus={status}
        onJamAction={handleJamAction}
        otherClips={profile.otherClips.map((c) => ({ id: c.id, thumbnail: c.thumbnail }))}
        onClipPress={(clipId) =>
          router.push({ pathname: '/player/[id]', params: { id: clipId, context: `profile-${profile.id}` } })
        }
      />

      <Modal visible={isJamModalVisible} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalDismissArea} activeOpacity={1} onPress={() => setJamModalVisible(false)} />
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
            <View style={[styles.modalHandle, { backgroundColor: theme.textSecondary }]} />
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Send Jam Request</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.background, color: theme.textPrimary, borderColor: theme.accent }]}
              placeholder="Hey! Love your style, want to link up?"
              placeholderTextColor={theme.textSecondary}
              multiline
              value={jamMessage}
              onChangeText={setJamMessage}
            />
            <TouchableOpacity
              style={[styles.modalSubmitButton, { backgroundColor: theme.primary }, requestSent && styles.modalSubmitSuccess]}
              onPress={handleSendJamRequest}
              disabled={isSendingRequest || requestSent}
            >
              {isSendingRequest ? (
                <ActivityIndicator color={theme.background} />
              ) : requestSent ? (
                <Ionicons name="checkmark" size={24} color={theme.background} />
              ) : (
                <Text style={[styles.modalSubmitText, { color: theme.background }]}>Send Request</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalDismissArea: { flex: 1 },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 300 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 20, opacity: 0.5 },
  modalTitle: { fontFamily: 'Bitcount', fontSize: 24, marginBottom: 20 },
  modalInput: {
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
  },
  modalSubmitButton: { height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  modalSubmitSuccess: { backgroundColor: '#4CAF50' },
  modalSubmitText: { fontFamily: 'Bitcount', fontSize: 18 },
});