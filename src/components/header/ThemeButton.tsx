import type { ThemeName } from '@/types/theme';

interface ThemeButtonProps {
  themeName: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

const ThemeButton = ({ themeName, onThemeChange }: ThemeButtonProps) => {
  const toggleTheme = () => {
    onThemeChange(themeName === 'light' ? 'dark' : 'light');
  };

  return (
    <button className="bg-purple cursor-pointer rounded-lg border-none px-4 py-2 text-white" onClick={toggleTheme}>
      {themeName === 'light' ? '🌙 다크모드' : '☀️ 라이트모드'}
    </button>
  );
};

export default ThemeButton;
