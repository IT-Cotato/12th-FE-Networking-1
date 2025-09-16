import React from "react";
import type { Theme, ThemeName } from "../styles/theme";

export type HeaderProps = {
  theme: Theme;
  themeName: ThemeName;
  onToggleTheme: () => void;
};

function Header({ theme, themeName, onToggleTheme }: HeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        padding: 16,
        background: theme.componentBg,
        borderRadius: 12,
        border: `1px solid ${theme.border}`,
      }}
    >
      <h1 style={{ margin: 0 }}>코테이토 영화관</h1>
      <button
        onClick={onToggleTheme}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
          background: theme.buttonBg,
          color: theme.buttonText,
          border: "none",
          borderRadius: 8,
        }}
      >
        {themeName === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
      </button>
    </header>
  );
}

export default Header;

