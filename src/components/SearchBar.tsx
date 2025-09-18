import React from "react";
import { type Theme } from "../styles/theme";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  currentTheme: Theme;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  currentTheme,
}) => {
  return (
    <input
      type="text"
      placeholder="검색..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
