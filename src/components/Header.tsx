import React from "react";
import { type Theme, type ThemeName } from "../styles/theme";

interface HeaderProps {
  themeName: ThemeName;
  toggleTheme: () => void;
  currentTheme: Theme;
}

const Header: React.FC<HeaderProps> = ({
  themeName,
  toggleTheme,
  currentTheme,
}) => (
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
    <button
      onClick={toggleTheme}
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
  </header>
);

export default Header;
