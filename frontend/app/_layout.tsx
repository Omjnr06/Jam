import { useFonts } from 'expo-font';
import { Stack } from 'expo-router'; 
import { DarkTheme, DefaultTheme, ThemeProvider, Theme as NavigationTheme } from '@react-navigation/native'; 
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useThemeStore } from '@/store/useThemeStore';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Bitcount: require('../assets/fonts/BitcountPropDoubleInk-VariableFont_CRSV,ELSH,ELXP,SZP1,SZP2,XPN1,XPN2,YPN1,YPN2,slnt,wght.ttf'),
  });
  const hasHydrated = useThemeStore((state) => state.hasHydrated);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [loaded, hasHydrated]);

  if (!loaded || !hasHydrated) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { isDark, theme } = useThemeStore();

  const navTheme: NavigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    dark: isDark,
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.textPrimary,
      border: theme.accent,
      notification: theme.primary,
    },
  };

  return (
    <ThemeProvider value={navTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}