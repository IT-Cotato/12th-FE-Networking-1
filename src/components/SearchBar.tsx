import React from 'react';
import type { Theme } from '../styles/theme';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentTheme: Theme;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  currentTheme 
}) => {
  return (
    <input
      type="text"
      placeholder="검색..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
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