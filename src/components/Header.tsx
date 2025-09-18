import React from "react";
import type { ThemeName } from "../styles/theme";
import { themes } from "../styles/theme";

interface HeaderProps {
  themeName: ThemeName;
  onToggleTheme: () => void;
}

export default function Header({ themeName, onToggleTheme }: HeaderProps) {
  const theme = themes[themeName];

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        padding: "16px",
        backgroundColor: theme.componentBg,
        borderRadius: "12px",
        border: `1px solid ${theme.border}`,
      }}
    >
      <h1 style={{ margin: 0 }}>🎬 영화 관리 앱</h1>
      <button
        onClick={onToggleTheme}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
          backgroundColor: theme.buttonBg,
          color: theme.buttonText,
          border: "none",
          borderRadius: "8px",
        }}
      >
        {themeName === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
      </button>
    </header>
  );
}
