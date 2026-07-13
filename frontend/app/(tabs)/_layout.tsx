import { SymbolView } from 'expo-symbols';
import { Link, Tabs } from 'expo-router';
import { Platform, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useThemeStore } from '@/store/useThemeStore';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const { theme } = useThemeStore();
  return (
      <Tabs
    screenOptions={{
      tabBarActiveTintColor: theme.textPrimary, 
      tabBarInactiveTintColor: theme.textSecondary, 
      tabBarStyle: {
        backgroundColor: theme.background,
        borderTopWidth: 1,
        borderTopColor: theme.accent,
      },
      headerShown: false, 
    }}>
    
    <Tabs.Screen
      name="hub"
      options={{
        title: 'The Hub',
        tabBarIcon: ({ color }) => <FontAwesome5 name="globe-americas" size={24} color={color} />,
      }}
    />
    
    <Tabs.Screen
      name="addPost"
      options={{
        title: 'Add Post',
        tabBarIcon: ({ color }) => <FontAwesome5 name="plus" size={24} color={color} />,
      }}
    />
    
    <Tabs.Screen
      name="inbox"
      options={{
        title: 'Messages',
        tabBarIcon: ({ color }) => <FontAwesome5 name="comment-alt" size={24} color={color} />,
      }}
    />
    
    <Tabs.Screen
      name="portfolio" 
      options={{
        title: 'Portfolio',
        tabBarIcon: ({ color }) => <FontAwesome5 name="play-circle" size={24} color={color} />,
      }}
    />
  </Tabs>
  );
}