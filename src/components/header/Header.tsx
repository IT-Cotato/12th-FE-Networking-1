import type { ThemeName } from '@/types/theme';

import ThemeButton from '@/components/header/ThemeButton';

import TitleSection from '../common/TitleSection';

interface HeaderProps {
  themeName: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

const Header = ({ themeName, onThemeChange }: HeaderProps) => {
  return (
    <div
      className={`mb-6 flex items-center justify-between rounded-xl border border-solid p-4 ${themeName === 'light' ? 'border-gray bg-white' : 'bg-deepGray border-darkGray'}`}
    >
      <TitleSection size="h1" text="코테이토 영화관" />
      <ThemeButton themeName={themeName} onThemeChange={onThemeChange} />
    </div>
  );
};

export default Header;
