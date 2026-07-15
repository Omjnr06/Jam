// "Your Network" — a grid of everyone with an accepted Jam Request.
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';
import { MOCK_CONVERSATIONS } from '@/constants/mockInbox';

export default function NetworkScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const connections = MOCK_CONVERSATIONS.filter((c) => c.status === 'accepted');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Network</Text>
      </View>

      {connections.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No accepted connections yet. Send a Jam Request from someone's profile to get started.
          </Text>
        </View>
      ) : (
        <FlatList
          data={connections}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.column}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({ pathname: '/user/[id]', params: { id: item.id } })}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, paddingTop: 55 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  backButton: { marginRight: 14 },
  headerTitle: { fontFamily: 'Bitcount', fontSize: 28, color: theme.textPrimary },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyText: { fontFamily: 'Inter', color: theme.textSecondary, textAlign: 'center', lineHeight: 20 },
  grid: { paddingHorizontal: 16, paddingBottom: 40 },
  column: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: theme.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.accent,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 16,
  },
  avatar: { width: 72, height: 72, borderRadius: 36, marginBottom: 10 },
  name: { fontFamily: 'Bitcount', fontSize: 16, color: theme.textPrimary },
});