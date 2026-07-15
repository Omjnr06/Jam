import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '@/constants/theme';

interface ThemeState {
  isDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

// theme store initialization
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      theme: lightTheme,
      toggleTheme: () => set((state) => ({
        isDark: !state.isDark,
        theme: !state.isDark ? darkTheme : lightTheme,
      })),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isDark: state.isDark }),
      merge: (persistedState, currentState) => {
        if (persistedState && typeof persistedState === 'object' && 'isDark' in persistedState) {
          const isDark = (persistedState as { isDark: boolean }).isDark;
          return { ...currentState, isDark, theme: isDark ? darkTheme : lightTheme };
        }
        const systemIsDark = Appearance.getColorScheme() === 'dark';
        return { ...currentState, isDark: systemIsDark, theme: systemIsDark ? darkTheme : lightTheme };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);