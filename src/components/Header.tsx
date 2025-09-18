import React from "react";
import { useAppContext } from "../context/AppContext";

const Header: React.FC = () => {
  const { isDark, toggleDarkMode } = useAppContext();

  return (
    <header className="p-6 flex justify-between items-center mb-6 bg-white dark:bg-deepGray rounded-lg border border-gray dark:border-darkGray">
      <h1 className="text-2xl font-bold text-black dark:text-white">코테이토 영화관 🥔</h1>
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