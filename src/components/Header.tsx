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
    <header className={`flex justify-between items-center mb-6 p-4 rounded-xl border ${
      themeName === 'light' 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-gray-800 border-gray-700'
    }`}>
      <h1 className="m-0 text-2xl font-bold">코테이토 영화관</h1>
      <ThemeToggleButton themeName={themeName} onToggle={onToggleTheme} />
    </header>
  );
}

export default Header;
