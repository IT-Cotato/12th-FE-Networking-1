import React from "react";

interface HeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center mb-6 p-6 bg-white dark:bg-deepGray rounded-lg border border-gray dark:border-darkGray">
      <h1 className="text-2xl font-bold text-black dark:text-white">코테이토 영화관</h1>
      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 rounded bg-yellowPoint text-black hover:bg-yellow-400 dark:bg-yellowPoint dark:text-black dark:hover:bg-yellow-300"
      >
        {isDark ? "☀️ 라이트모드" : "🌙 다크모드"}
      </button>
    </header>
  );
};

export default Header;
