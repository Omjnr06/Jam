import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, InteractionManager } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';
import { HUB_SECTIONS } from '@/constants/mockHubSections';

const SEARCHABLE = HUB_SECTIONS.flatMap((section) =>
  section.data.map((artist) => ({ ...artist, contextKey: section.contextKey }))
);
const ALL_ARTISTS = Array.from(new Map(SEARCHABLE.map((a) => [a.id, a])).values());

export default function SearchScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      inputRef.current?.focus();
    });
    return () => task.cancel();
  }, []);

  const results =
    query.trim().length === 0
      ? []
      : ALL_ARTISTS.filter((a) => {
          const q = query.toLowerCase();
          return (
            a.name.toLowerCase().includes(q) ||
            a.instrument.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q))
          );
        });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <FontAwesome5 name="search" size={14} color={theme.textPrimary} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="SEARCH FOR TAGS, LOCATIONS, INSTRUMENTS..."
            placeholderTextColor={theme.textSecondary}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push({ pathname: '/player/[id]', params: { id: item.id, context: item.contextKey } })}
          >
            <FontAwesome5 name={item.instrument} size={18} color={theme.textPrimary} style={styles.rowIcon} />
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.tags}>{item.tags.join(' ')}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          query.trim().length === 0 ? null : (
            <Text style={styles.emptyText}>No matches for "{query}"</Text>
          )
        }
      />
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, paddingTop: 55 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  backButton: { marginRight: 12 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  searchInput: { fontFamily: 'Bitcount', fontSize: 12, marginLeft: 10, flex: 1, color: theme.textPrimary },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.accent,
    padding: 14,
    marginBottom: 12,
  },
  rowIcon: { marginRight: 14, width: 20, textAlign: 'center' },
  rowText: { flex: 1 },
  name: { fontFamily: 'Bitcount', fontSize: 16, color: theme.textPrimary },
  tags: { fontFamily: 'Inter', fontSize: 12, color: theme.textSecondary, marginTop: 2 },
  emptyText: { textAlign: 'center', marginTop: 40, fontFamily: 'Inter', color: theme.textSecondary },
});