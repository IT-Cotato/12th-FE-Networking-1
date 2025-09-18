import React from "react";
import { type ThemeName, themes } from "../styles/theme";
import ThemeToggleButton from "./ThemeToggleButton";

interface HeaderProps {
  themeName: ThemeName;
  onToggleTheme: () => void;
}

function Header({ themeName, onToggleTheme }: HeaderProps) {
  const currentTheme = themes[themeName];

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        padding: "16px",
        backgroundColor: currentTheme.componentBg,
        borderRadius: "12px",
        border: `1px solid ${currentTheme.border}`,
      }}
    >
      <h1 style={{ margin: 0 }}>코테이토 영화관</h1>
      <ThemeToggleButton themeName={themeName} onToggle={onToggleTheme} />
    </header>
  );
}

export default Header;
