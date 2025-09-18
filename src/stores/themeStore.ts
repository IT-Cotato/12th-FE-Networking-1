import { create } from 'zustand';
import { themes, type ThemeName } from '../styles/theme';

interface ThemeState {
  themeName: ThemeName;
  currentTheme: typeof themes.light;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeName: 'light',
  currentTheme: themes.light,
  toggleTheme: () => set((state) => {
    const newThemeName = state.themeName === 'light' ? 'dark' : 'light';
    return {
      themeName: newThemeName,
      currentTheme: themes[newThemeName]
    };
  }),
}));