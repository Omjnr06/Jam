import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, InteractionManager } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';
import { MOCK_PEOPLE, ALL_LOCATIONS } from '@/constants/mockPeople';
import { ALL_INSTRUMENTS, ALL_GENRES } from '@/constants/pickerOptions';
import InstrumentIcon from '@/components/IntsrumentIcon';
import TagSelector from '@/components/TagSelector';

export default function SearchScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [instrumentFilters, setInstrumentFilters] = useState<string[]>([]);
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [genreFilters, setGenreFilters] = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      inputRef.current?.focus();
    });
    return () => task.cancel();
  }, []);

  const activeFilterCount = instrumentFilters.length + locationFilters.length + genreFilters.length;
  const hasQuery = query.trim().length > 0;
  const hasAnyCriteria = hasQuery || activeFilterCount > 0;

  const results = !hasAnyCriteria
    ? []
    : MOCK_PEOPLE.filter((p) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !hasQuery ||
          p.name.toLowerCase().includes(q) ||
          p.instrument.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          (p.clips[0]?.tags ?? []).some((t) => t.toLowerCase().includes(q));

        const matchesInstrument =
          instrumentFilters.length === 0 || p.instruments.some((i) => instrumentFilters.includes(i));
        const matchesLocation =
          locationFilters.length === 0 || locationFilters.includes(p.location);
        const matchesGenre =
          genreFilters.length === 0 || p.genres.some((g) => genreFilters.includes(g));

        return matchesQuery && matchesInstrument && matchesLocation && matchesGenre;
      });

  const clearFilters = () => {
    setInstrumentFilters([]);
    setLocationFilters([]);
    setGenreFilters([]);
  };

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
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters((v) => !v)}>
          <Ionicons name="options-outline" size={20} color={theme.textPrimary} />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersPanel}>
          <TagSelector
            theme={theme}
            label="INSTRUMENT"
            masterList={ALL_INSTRUMENTS}
            selected={instrumentFilters}
            onChange={setInstrumentFilters}
            searchPlaceholder="Search instruments..."
            showInstrumentIcons
          />
          <TagSelector
            theme={theme}
            label="LOCATION"
            masterList={ALL_LOCATIONS}
            selected={locationFilters}
            onChange={setLocationFilters}
            searchPlaceholder="Search locations..."
          />
          <TagSelector
            theme={theme}
            label="GENRE"
            masterList={ALL_GENRES}
            selected={genreFilters}
            onChange={setGenreFilters}
            searchPlaceholder="Search genres..."
          />
          {activeFilterCount > 0 && (
            <TouchableOpacity onPress={clearFilters} style={styles.clearFiltersBtn}>
              <Text style={styles.clearFiltersText}>Clear all filters</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isHubFeatured = item.hubSections.length > 0;
          const contextKey = isHubFeatured ? item.hubSections[0] : `profile-${item.id}`;
          const clipId = isHubFeatured ? item.id : item.clips[0].id;

          return (
            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push({ pathname: '/player/[id]', params: { id: clipId, context: contextKey } })}
            >
              <InstrumentIcon instrument={item.instrument} size={18} color={theme.textPrimary} style={styles.rowIcon} />
              <View style={styles.rowText}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.tags}>
                  {item.location} · {(item.clips[0]?.tags ?? []).join(' ')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          !hasAnyCriteria ? null : <Text style={styles.emptyText}>No matches found.</Text>
        }
      />
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, paddingTop: 55 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12, gap: 10 },
  backButton: {},
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  filterBadgeText: { fontFamily: 'Inter', fontSize: 10, fontWeight: '700', color: theme.accent },
  filtersPanel: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: theme.accent,
    marginBottom: 16,
  },
  clearFiltersBtn: { alignSelf: 'flex-start', marginBottom: 16 },
  clearFiltersText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
    textDecorationLine: 'underline',
  },
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