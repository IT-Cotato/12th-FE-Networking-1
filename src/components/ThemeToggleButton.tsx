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
      style={{
        padding: "8px 16px",
        cursor: "pointer",
        background: currentTheme.buttonBg,
        color: currentTheme.buttonText,
        border: "none",
        borderRadius: "8px",
      }}
    >
      {themeName === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
    </button>
  );
}

export default ThemeToggleButton;
