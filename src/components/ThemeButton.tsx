import type { Theme } from "../styles/theme";
import { useTheme } from "../hooks/useTheme";

/**
 *
 * @returns ThemeButton 컴포넌트
 */
const ThemeButton = () => {
  const { currentTheme, theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
      style={{
        padding: "8px 16px",
        cursor: "pointer",
        background: currentTheme.buttonBg,
        color: currentTheme.buttonText,
        border: "none",
        borderRadius: "8px",
      }}
    >
      {theme === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
    </button>
  );
};

export default ThemeButton;
