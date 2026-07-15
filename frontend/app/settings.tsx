import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { useProfileStore } from '@/store/useProfileStore';
import { Theme } from '@/constants/theme';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useThemeStore();
  const resetProfile = useProfileStore((s) => s.resetProfile);
  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          resetProfile();
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Signed in as</Text>
          <Text style={styles.rowValue}>artist@studio.com</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>APPEARANCE</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.surface, true: theme.primary }}
            thumbColor={theme.accent}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logOutBtn} onPress={handleLogOut}>
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, paddingTop: 55, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  backButton: { marginRight: 14 },
  headerTitle: { fontFamily: 'Bitcount', fontSize: 28, color: theme.textPrimary },
  section: { marginBottom: 28 },
  sectionLabel: { fontFamily: 'Bitcount', fontSize: 12, color: theme.textSecondary, letterSpacing: 1, marginBottom: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.accent,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rowLabel: { fontFamily: 'Inter', fontSize: 15, color: theme.textPrimary },
  rowValue: { fontFamily: 'Inter', fontSize: 14, color: theme.textSecondary },
  logOutBtn: { backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 26, alignItems: 'center', marginTop: 20 },
  logOutText: { fontFamily: 'Bitcount', color: theme.accent, fontSize: 16 },
});