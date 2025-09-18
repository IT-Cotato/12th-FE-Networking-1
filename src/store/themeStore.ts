import { create } from 'zustand';
import { themes, type ThemeName } from '../styles/theme';

interface ThemeStore {
  themeName: ThemeName;
  currentTheme: typeof themes.light;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  themeName: 'light',
  currentTheme: themes.light,
  toggleTheme: () => {
    const newTheme = get().themeName === 'light' ? 'dark' : 'light';
    set({
      themeName: newTheme,
      currentTheme: themes[newTheme]
    });
  }
}));