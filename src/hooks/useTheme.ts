import { useState } from "react";
import { themes, type ThemeName } from "../styles/theme";

export function useTheme() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  
  const currentTheme = themes[themeName];
  
  const toggleTheme = () => {
    setThemeName(prev => prev === "light" ? "dark" : "light");
  };

  return {
    themeName,
    currentTheme,
    setThemeName,
    toggleTheme,
  };
}
