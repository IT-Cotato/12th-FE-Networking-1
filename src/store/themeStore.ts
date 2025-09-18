import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes, type ThemeName, type Theme } from '../styles/theme';

interface ThemeStore {
  themeName: ThemeName;
  currentTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themeName: 'light',
      currentTheme: themes.light,
      toggleTheme: () => {
        const newTheme = get().themeName === 'light' ? 'dark' : 'light';
        set({
          themeName: newTheme,
          currentTheme: themes[newTheme],
        });
      },
      setTheme: (theme: ThemeName) => {
        set({
          themeName: theme,
          currentTheme: themes[theme],
        });
      },
    }),
    {
      name: 'theme-storage', // localStorage key
      partialize: (state) => ({ themeName: state.themeName }), // 테마명만 저장
      onRehydrateStorage: () => (state) => {
        if (state) {
          // 새로고침 시 currentTheme 동기화
          state.currentTheme = themes[state.themeName];
        }
      },
    }
  )
);
