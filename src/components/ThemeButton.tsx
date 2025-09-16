import { useState } from "react";
import type { Theme, ThemeName } from "../styles/theme";

interface ThemeButtonState {
  currentTheme: Theme;
}

/**
 *
 * @param currentTheme interface Theme 형태의 색상 모드 객체이다.
 * @returns ThemeButton 컴포넌트
 */
const ThemeButton = ({ currentTheme }: ThemeButtonState) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  return (
    <button
      onClick={() => setThemeName(themeName === "light" ? "dark" : "light")}
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
};

export default ThemeButton;
