import React from "react";
import { type ThemeName, themes } from "../styles/theme";

interface ThemeToggleButtonProps {
  themeName: ThemeName;
  onToggle: () => void;
}

function ThemeToggleButton({ themeName, onToggle }: ThemeToggleButtonProps) {
  const currentTheme = themes[themeName];

  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-lg border-none cursor-pointer transition-colors ${
        themeName === 'light' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      {themeName === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
    </button>
  );
}

export default ThemeToggleButton;
