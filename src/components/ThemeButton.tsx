import { useTheme } from "../hooks/useTheme";
import Button from "./Button";

/**
 *
 * @returns ThemeButton 컴포넌트
 */
const ThemeButton = () => {
  const { currentTheme, theme, toggleTheme } = useTheme();

  return (
    <Button
      text={theme === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
      onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
    />
  );
};

export default ThemeButton;
