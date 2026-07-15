import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { useProfileStore } from '@/store/useProfileStore';
import { Theme } from '@/constants/theme';
import { ALL_INSTRUMENTS, ALL_GENRES, ALL_INTENTS } from '@/constants/pickerOptions';
import { ALL_LOCATIONS } from '@/constants/mockPeople';
import TagSelector from '@/components/TagSelector';

export default function EditProfileScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const profile = useProfileStore();

  const [photo, setPhoto] = useState<string | null>(profile.photo);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState<string[]>(profile.location ? [profile.location] : []);
  const [instruments, setInstruments] = useState<string[]>(profile.instruments);
  const [genres, setGenres] = useState<string[]>(profile.genres);
  const [intents, setIntents] = useState<string[]>(profile.intents);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleSave = () => {
    profile.setProfile({ photo, name, bio, location: location[0] ?? '', instruments, genres, intents });
    Alert.alert('Profile Updated', 'Your changes have been saved.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <TouchableOpacity style={styles.photoUpload} onPress={pickPhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.uploadedImage} />
        ) : (
          <>
            <FontAwesome5 name="camera" size={28} color={theme.textSecondary} />
            <Text style={styles.uploadText}>CHANGE PHOTO</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>NAME</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>BIO</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
          multiline
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <TagSelector
        theme={theme}
        label="LOCATION"
        masterList={ALL_LOCATIONS}
        selected={location}
        onChange={setLocation}
        searchPlaceholder="Search or type your city/school..."
        singleSelect
        allowCustom
      />

      <TagSelector
        theme={theme}
        label="INSTRUMENTS"
        masterList={ALL_INSTRUMENTS}
        selected={instruments}
        onChange={setInstruments}
        searchPlaceholder="Search instruments..."
        showInstrumentIcons
      />

      <TagSelector
        theme={theme}
        label="GENRES"
        masterList={ALL_GENRES}
        selected={genres}
        onChange={setGenres}
        searchPlaceholder="Search genres..."
      />

      <TagSelector
        theme={theme}
        label="LOOKING FOR"
        masterList={ALL_INTENTS}
        selected={intents}
        onChange={setIntents}
        searchPlaceholder="Search..."
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  scrollContent: { paddingHorizontal: 24, paddingTop: 55, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backButton: { marginRight: 14 },
  headerTitle: { fontFamily: 'Bitcount', fontSize: 28, color: theme.textPrimary },
  photoUpload: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.surface,
    borderWidth: 2,
    borderColor: theme.accent,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  uploadedImage: { width: '100%', height: '100%' },
  uploadText: { fontFamily: 'Inter', fontSize: 10, color: theme.textSecondary, fontWeight: 'bold', marginTop: 8 },
  fieldGroup: { marginBottom: 22 },
  label: { fontFamily: 'Bitcount', fontSize: 13, color: theme.textPrimary, marginBottom: 8, letterSpacing: 1 },
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
  },
  saveBtn: { backgroundColor: theme.primary, paddingVertical: 18, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  saveBtnText: { fontFamily: 'Bitcount', color: theme.accent, fontSize: 18 },
});