import React from "react";
import type { Theme } from "../styles/theme";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentTheme: Theme;
  placeholder?: string;
}

export function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  currentTheme, 
  placeholder = "검색..." 
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "8px",
        border: `1px solid ${currentTheme.border}`,
        backgroundColor: currentTheme.inputBg,
        color: currentTheme.text,
        marginBottom: "16px",
        width: "100%",
        fontSize: "14px",
        transition: "border-color 0.2s ease",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = currentTheme.buttonBg;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = currentTheme.border;
      }}
    />
  );
}
