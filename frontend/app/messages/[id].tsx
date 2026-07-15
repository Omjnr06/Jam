import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';
import { MOCK_CONVERSATIONS } from '@/constants/mockInbox';
import { MOCK_MESSAGES, Message } from '@/constants/mockMessages';

export default function ChatScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { id } = useLocalSearchParams() as { id: string };
  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === id);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[id ?? ''] ?? []);
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, senderId: 'me', text: draft.trim(), timestamp: 'Now' },
    ]);
    setDraft('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        {conversation && <Image source={{ uri: conversation.avatar }} style={styles.headerAvatar} />}
        <Text style={styles.headerName}>{conversation?.name ?? 'Chat'}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <View style={[styles.bubbleRow, item.senderId === 'me' ? styles.bubbleRowMe : styles.bubbleRowThem]}>
              <View style={[styles.bubble, item.senderId === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, item.senderId === 'me' && styles.bubbleTextMe]}>
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            placeholderTextColor={theme.textSecondary}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="arrow-up" size={20} color={theme.accent} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  flexOne: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.accent,
  },
  backButton: {
    marginRight: 10,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerName: {
    fontFamily: 'Bitcount',
    fontSize: 20,
    color: theme.textPrimary,
  },
  messageList: {
    padding: 16,
    paddingBottom: 20,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bubbleRowMe: {
    justifyContent: 'flex-end',
  },
  bubbleRowThem: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bubbleMe: {
    backgroundColor: theme.primary,
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.accent,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: theme.textPrimary,
  },
  bubbleTextMe: {
    color: theme.accent,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: theme.accent,
  },
  input: {
    flex: 1,
    backgroundColor: theme.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: theme.textPrimary,
    fontFamily: 'Inter',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: theme.accent,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});