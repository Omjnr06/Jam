import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { useProfileStore } from '@/store/useProfileStore';
import { Theme } from '@/constants/theme';
import { PersonClip } from '@/constants/mockPeople';

export default function ManageClipsScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const clips = useProfileStore((s) => s.clips);
  const setClips = useProfileStore((s) => s.setClips);
  const featuredClipId = useProfileStore((s) => s.featuredClipId);
  const setFeaturedClip = useProfileStore((s) => s.setFeaturedClip);
  const [editingClip, setEditingClip] = useState<PersonClip | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTags, setEditTags] = useState('');

  const openEdit = (clip: PersonClip) => {
    setEditingClip(clip);
    setEditTitle(clip.title);
    setEditDescription(clip.description ?? '');
    setEditTags(clip.tags.join(', '));
  };

  const saveEdit = () => {
    if (!editingClip) return;
    setClips(
      clips.map((c) =>
        c.id === editingClip.id
          ? {
              ...c,
              title: editTitle,
              description: editDescription.trim() ? editDescription : undefined,
              tags: editTags.split(',').map((t) => t.trim()).filter(Boolean),
            }
          : c
      )
    );
    setEditingClip(null);
  };

  const handleDelete = (clip: PersonClip) => {
    Alert.alert('Delete Clip', `Delete "${clip.title}"? This can't be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setClips(clips.filter((c) => c.id !== clip.id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Clips</Text>
      </View>

      {clips.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome5 name="film" size={32} color={theme.textSecondary} />
          <Text style={styles.emptyText}>No clips yet. Post one from Add Post.</Text>
        </View>
      ) : (
        <FlatList
          data={clips}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isFeatured = item.id === featuredClipId;
            return (
              <View style={styles.row}>
                <View style={styles.thumbWrapper}>
                  <Image source={{ uri: item.thumbnail }} style={styles.thumbImage} resizeMode="cover" />
                  {isFeatured && (
                    <View style={styles.featuredDot}>
                      <Ionicons name="star" size={11} color="#412D15" />
                    </View>
                  )}
                </View>

                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.rowTagsRow}>
                    {item.tags.map((tag, i) => (
                      <View key={i} style={styles.rowTagBadge}>
                        <Text style={styles.rowTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.rowActionsRow}>
                    <TouchableOpacity
                      style={[styles.featureBtn, isFeatured && styles.featureBtnActive]}
                      onPress={() => setFeaturedClip(item.id)}
                      disabled={isFeatured}
                    >
                      <Ionicons
                        name={isFeatured ? 'star' : 'star-outline'}
                        size={13}
                        color={isFeatured ? theme.accent : theme.textPrimary}
                      />
                      <Text style={[styles.featureBtnText, isFeatured && styles.featureBtnTextActive]}>
                        {isFeatured ? 'Featured' : 'Feature'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editBtn} onPress={() => openEdit(item)}>
                      <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item)}>
                      <Ionicons name="trash-outline" size={14} color={theme.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      <Modal visible={!!editingClip} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalDismissArea} activeOpacity={1} onPress={() => setEditingClip(null)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Edit Clip</Text>
            <Text style={styles.label}>TITLE</Text>
            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholderTextColor={theme.textSecondary}
            />
            <Text style={styles.label}>DESCRIPTION (OPTIONAL)</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={editDescription}
              onChangeText={setEditDescription}
              multiline
              placeholder="Tell viewers more about this clip..."
              placeholderTextColor={theme.textSecondary}
            />
            <Text style={styles.label}>TAGS</Text>
            <TextInput
              style={styles.input}
              value={editTags}
              onChangeText={setEditTags}
              placeholder="#Jazz, #Toronto"
              placeholderTextColor={theme.textSecondary}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={saveEdit}>
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, paddingTop: 55 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  backButton: { marginRight: 14 },
  headerTitle: { fontFamily: 'Bitcount', fontSize: 28, color: theme.textPrimary },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyText: { fontFamily: 'Inter', color: theme.textSecondary, marginTop: 12, textAlign: 'center' },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  row: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.accent,
    padding: 12,
    marginBottom: 14,
  },
  thumbWrapper: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 14,
  },
  thumbImage: { width: '100%', height: '100%' },
  featuredDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(225,220,201,0.95)',
    borderRadius: 10,
    padding: 4,
  },
  rowContent: { flex: 1, justifyContent: 'space-between' },
  rowTitle: { fontFamily: 'Bitcount', fontSize: 17, color: theme.textPrimary, marginBottom: 4 },
  rowTagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  rowTagBadge: { backgroundColor: theme.primary, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  rowTagText: { fontFamily: 'Inter', fontSize: 10, color: theme.accent, fontWeight: '600' },
  rowActionsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  featureBtnActive: { backgroundColor: theme.primary, borderColor: theme.primary },
  featureBtnText: { fontFamily: 'Inter', fontSize: 11, color: theme.textPrimary, fontWeight: '600' },
  featureBtnTextActive: { color: theme.accent },
  editBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, backgroundColor: theme.primary },
  editBtnText: { fontFamily: 'Inter', fontSize: 11, color: theme.accent, fontWeight: '700' },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalDismissArea: { flex: 1 },
  modalContent: { backgroundColor: theme.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 340 },
  modalHandle: { width: 40, height: 4, backgroundColor: theme.textSecondary, borderRadius: 2, alignSelf: 'center', marginBottom: 20, opacity: 0.5 },
  modalTitle: { fontFamily: 'Bitcount', fontSize: 22, color: theme.textPrimary, marginBottom: 16 },
  label: { fontFamily: 'Bitcount', fontSize: 12, color: theme.textPrimary, marginBottom: 6, letterSpacing: 1 },
  input: {
    fontFamily: 'Inter',
    fontSize: 14,
    backgroundColor: theme.background,
    color: theme.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.accent,
    marginBottom: 16,
  },
  descriptionInput: { minHeight: 80, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 26, alignItems: 'center', marginTop: 4 },
  saveBtnText: { fontFamily: 'Bitcount', color: theme.accent, fontSize: 16 },
});