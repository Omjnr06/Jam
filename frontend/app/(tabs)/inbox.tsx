import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';

export default function InboxScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={styles.separator} />
      <Text style={styles.subText}>Coming soon.</Text>
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background,
  },
  title: {
    fontFamily: 'Bitcount',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: theme.accent,
  },
  subText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: theme.textSecondary,
  },
});