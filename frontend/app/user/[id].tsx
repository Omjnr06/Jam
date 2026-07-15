import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { MOCK_PEOPLE_BY_ID } from '@/constants/mockPeople';
import ProfileHero, { JamStatus } from '@/components/ProfileHero';

export default function UserProfileScreen() {
  const { theme } = useThemeStore();
  const { id } = useLocalSearchParams() as { id: string };
  const person = id ? MOCK_PEOPLE_BY_ID[id] : undefined;


  if (!person) {
    return (
      <View style={[styles.notFoundContainer, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.notFoundBack}>
          <Ionicons name="chevron-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.notFoundText, { color: theme.textSecondary }]}>Profile not found.</Text>
      </View>
    );
  }

  const featuredClip = person.clips[0];
  const otherClips = person.clips.slice(1);

  const [status, setStatus] = useState<JamStatus>(person.jamStatus);
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
    Alert.alert(person.name, undefined, [
      { text: 'Report', style: 'destructive', onPress: () => Alert.alert('Reported', `${person.name} has been reported.`) },
      { text: 'Block', style: 'destructive', onPress: () => Alert.alert('Blocked', `${person.name} has been blocked.`) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleJamAction = () => {
    if (status === 'none') setJamModalVisible(true);
    if (status === 'incoming') {
      setStatus('accepted');
      Alert.alert('Request Accepted', `You and ${person.name} are now connected.`);
    }
    if (status === 'accepted') router.push({ pathname: '/messages/[id]', params: { id: person.id } });
  };

  return (
    <View style={{ flex: 1 }}>
      <ProfileHero
        theme={theme}
        name={person.name}
        bio={person.bio}
        location={person.location}
        instruments={person.instruments}
        genres={person.genres}
        primaryIntent={person.intents[0]}
        isCurrentUser={false}
        featuredVideoUrl={featuredClip.videoUrl}
        onBack={() => router.back()}
        onMoreOptions={handleMoreOptions}
        jamStatus={status}
        onJamAction={handleJamAction}
        otherClips={otherClips.map((c) => ({ id: c.id, thumbnail: c.thumbnail }))}
        onClipPress={(clipId) =>
          router.push({ pathname: '/player/[id]', params: { id: clipId, context: `profile-${person.id}` } })
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
  notFoundContainer: { flex: 1, paddingTop: 55, paddingHorizontal: 20 },
  notFoundBack: { marginBottom: 20 },
  notFoundText: { fontFamily: 'Inter', fontSize: 15, textAlign: 'center', marginTop: 40 },
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