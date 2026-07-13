import { create } from 'zustand';
import { lightTheme, darkTheme } from '@/constants/theme';

interface ThemeState {
  isDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false, 
  theme: lightTheme,
  toggleTheme: () => set((state) => ({ 
    isDark: !state.isDark, 
    theme: !state.isDark ? darkTheme : lightTheme 
  })),
}));