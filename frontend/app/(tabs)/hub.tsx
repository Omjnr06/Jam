import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import SpinningLogo from '../../components/SpinningLogo';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';
import FeedSection from '@/components/FeedSection';
import { HUB_SECTIONS } from '@/constants/mockHubSections';
import { router } from 'expo-router';

export default function HubScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.logoText}>JAM</Text>
          
          <TouchableOpacity style={styles.avatarWrapper} onPress={() => router.push('/portfolio')}>
            <SpinningLogo scale={0.4} speed={1200}>
              <FontAwesome5 name="user-circle" size={80} color={theme.textPrimary} solid />
            </SpinningLogo>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchBar} onPress={() => router.push('../search')}>
          <FontAwesome5 name="search" size={14} color={theme.textPrimary} />
          <Text style={styles.searchPlaceholder}>SEARCH FOR TAGS, LOCATIONS...</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {HUB_SECTIONS.map((section, index) => (
          <FeedSection
            key={section.contextKey}
            title={section.title}
            data={section.data}
            contextKey={section.contextKey}
            theme={theme}
            isLast={index === HUB_SECTIONS.length - 1}
          />
        ))}
      </ScrollView>
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
    marginBottom: 10,
    zIndex: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Bitcount',
    fontSize: 48,
    color: theme.textPrimary,
  },
  avatarWrapper: {
    width: 85, 
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: theme.surface, 
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    marginTop: 5, 
    borderWidth: 1,
    borderColor: theme.accent,
  },
  searchPlaceholder: {
    fontFamily: 'Bitcount',
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
    color: theme.textSecondary,
  },
  feed: {
    flex: 1,
  },
});