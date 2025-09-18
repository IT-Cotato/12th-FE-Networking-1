import { useState } from 'react';
import { themes, type ThemeName } from '../styles/theme';

export const useTheme = () => {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const currentTheme = themes[themeName];

  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  return {
    themeName,
    currentTheme,
    toggleTheme
  };
};