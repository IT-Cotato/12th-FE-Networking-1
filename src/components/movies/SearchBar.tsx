import React from "react";
import { themes } from "../../styles/theme";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  currentTheme: typeof themes.light;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  currentTheme,
}) => {
  return (
    <input
      type="text"
      placeholder="검색..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "8px",
        border: `1px solid ${currentTheme.border}`,
        backgroundColor: currentTheme.inputBg,
        color: currentTheme.text,
        marginBottom: "16px",
        width: "100%",
      }}
    />
  );
};

export default SearchBar;
