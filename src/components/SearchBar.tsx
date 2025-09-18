import React from "react";
import { themes, type ThemeName } from "../styles/theme";
import { useAppContext } from "../context/AppContext";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (v: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({searchTerm, onSearch }) => {
const { isDark, toggleDarkMode } = useAppContext();

  return (
    <div className="p-6 bg-lightBackground text-black dark:bg-darkBackground dark:text-white transition-all duration-200">
    <input
      type="text"
      placeholder="검색하기 🔍"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
  className={`
    w-full mb-4 p-2 rounded border
    border-gray dark:border-darkGray
    bg-white dark:bg-deepGray
    text-black dark:text-white
  `}
    />
    </div>
  );
};

export default SearchBar;