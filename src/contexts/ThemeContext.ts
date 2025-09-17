import React from "react";
import type { ThemeName } from "../styles/theme";

interface ThemeContextType {
  theme: ThemeName;
  toggleTheme: (value: ThemeName) => void;
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);
