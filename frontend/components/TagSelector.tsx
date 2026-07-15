import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/constants/theme';

interface TagSelectorProps {
  theme: Theme;
  label: string;
  masterList: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  searchPlaceholder?: string;
}

// uses the picker options to let tags be choosable in onboarding and in edit profile page 
export default function TagSelector({ theme, label, masterList, selected, onChange, searchPlaceholder }: TagSelectorProps) {
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = masterList.filter(
    (item) => item.toLowerCase().includes(search.toLowerCase()) && !selected.includes(item)
  );

  const removeItem = (item: string) => onChange(selected.filter((i) => i !== item));

  const addItem = (item: string) => {
    onChange([...selected, item]);
    setSearch('');
    setShowSearch(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.chipRow}>
        {selected.map((item) => (
          <TouchableOpacity key={item} style={styles.chipSelected} onPress={() => removeItem(item)}>
            <Text style={styles.chipTextSelected}>{item}</Text>
            <Ionicons name="close" size={14} color={theme.accent} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addChip} onPress={() => setShowSearch((v) => !v)}>
          <Ionicons name={showSearch ? 'close' : 'add'} size={16} color={theme.textPrimary} />
          <Text style={styles.addChipText}>{showSearch ? 'Close' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      {showSearch && (
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder={searchPlaceholder ?? `Search ${label.toLowerCase()}...`}
            placeholderTextColor={theme.textSecondary}
            value={search}
            onChangeText={setSearch}
            autoFocus
          />
          {search.length > 0 && (
            <View style={styles.resultsDropdown}>
              <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled" style={{ maxHeight: 150 }}>
                {filtered.map((item) => (
                  <TouchableOpacity key={item} style={styles.resultItem} onPress={() => addItem(item)}>
                    <Text style={styles.resultText}>{item}</Text>
                    <Ionicons name="add" size={16} color={theme.textPrimary} />
                  </TouchableOpacity>
                ))}
                {filtered.length === 0 && (
                  <Text style={styles.noResultsText}>No matches found.</Text>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  fieldGroup: { marginBottom: 22 },
  label: { fontFamily: 'Bitcount', fontSize: 13, color: theme.textPrimary, marginBottom: 8, letterSpacing: 1 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chipSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  chipTextSelected: { fontFamily: 'Inter', fontSize: 13, color: theme.accent, fontWeight: '600' },
  addChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.accent,
    borderStyle: 'dashed',
  },
  addChipText: { fontFamily: 'Inter', fontSize: 13, color: theme.textPrimary, fontWeight: '600', marginLeft: 4 },
  searchWrapper: { marginTop: 12 },
  searchInput: {
    fontFamily: 'Inter',
    fontSize: 15,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  resultsDropdown: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.accent,
    borderRadius: 12,
    marginTop: 6,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.surface,
  },
  resultText: { fontFamily: 'Inter', fontSize: 14, color: theme.textPrimary },
  noResultsText: { fontFamily: 'Inter', fontSize: 14, color: theme.textSecondary, padding: 16, textAlign: 'center' },
});