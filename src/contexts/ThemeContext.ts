import React from "react";
import type { Theme, ThemeName } from "../styles/theme";

interface ThemeContextType {
  currentTheme: Theme;
  theme: ThemeName;
  toggleTheme: (value: ThemeName) => void;
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);
