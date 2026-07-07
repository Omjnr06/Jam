import { SymbolView } from 'expo-symbols';
import { Link, Tabs } from 'expo-router';
import { Platform, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
      <Tabs
    screenOptions={{
      tabBarActiveTintColor: '#412D15', 
      tabBarInactiveTintColor: '#A9A197', 
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E1DCC9',
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
