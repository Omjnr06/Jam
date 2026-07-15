// The Inbox tab — three-way split (Accepted / Pending / Sent). Starts
// from MOCK_CONVERSATIONS (derived from MOCK_PEOPLE) but copies it into
// local state so Accept/Decline can mutate it without touching the mock
// source data itself.
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';
import { MOCK_CONVERSATIONS, RequestStatus, Conversation } from '@/constants/mockInbox';

const TABS: RequestStatus[] = ['accepted', 'pending', 'sent'];
const TAB_LABELS: Record<RequestStatus, string> = {
  accepted: 'Accepted',
  pending: 'Pending',
  sent: 'Sent',
};
const EMPTY_MESSAGES: Record<RequestStatus, string> = {
  accepted: 'No accepted connections yet. Send a Jam Request from someone\'s profile to get started!',
  pending: 'No pending requests waiting on you right now.',
  sent: 'You haven\'t sent any Jam Requests yet.',
};

export default function InboxScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [activeTab, setActiveTab] = useState<RequestStatus>('accepted');
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  const filtered = conversations.filter((c) => c.status === activeTab);

  const handleAccept = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'accepted' as RequestStatus } : c))
    );
  };

  const handleDecline = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>JAM</Text>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {TAB_LABELS[tab]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            activeOpacity={item.status === 'accepted' ? 0.7 : 1}
            disabled={item.status !== 'accepted'}
            onPress={() => router.push({ pathname: '/messages/[id]', params: { id: item.id } })}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.preview} numberOfLines={1}>{item.lastMessage}</Text>
            </View>

            {item.status === 'pending' && (
              <View style={styles.pendingActions}>
                <TouchableOpacity style={styles.acceptBtn} onPress={() => handleAccept(item.id)}>
                  <Text style={styles.acceptBtnText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineBtn} onPress={() => handleDecline(item.id)}>
                  <Text style={styles.declineBtnText}>Decline</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.status === 'sent' && (
              <View style={styles.sentBadge}>
                <Text style={styles.sentBadgeText}>Requested</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>{EMPTY_MESSAGES[activeTab]}</Text>}
      />
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 55,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  logoText: {
    fontFamily: 'Bitcount',
    fontSize: 40,
    color: theme.textPrimary,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: theme.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.accent,
  },
  tabButtonActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  tabText: {
    fontFamily: 'Bitcount',
    fontSize: 14,
    color: theme.textPrimary,
  },
  tabTextActive: {
    color: theme.accent,
  },
  listContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 30,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
  },
  rowText: {
    flex: 1,
  },
  name: {
    fontFamily: 'Bitcount',
    fontSize: 18,
    color: theme.textPrimary,
    marginBottom: 4,
  },
  preview: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: theme.textSecondary,
  },
  pendingActions: {
    alignItems: 'flex-end',
  },
  acceptBtn: {
    backgroundColor: theme.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 6,
  },
  acceptBtnText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.accent,
  },
  declineBtn: {
    borderWidth: 1,
    borderColor: theme.textSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  declineBtnText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: theme.textSecondary,
  },
  sentBadge: {
    borderWidth: 1,
    borderColor: theme.textSecondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  sentBadgeText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    marginHorizontal: 40,
    fontFamily: 'Inter',
    color: theme.textSecondary,
    lineHeight: 20,
  },
});