import React from "react";
import styled from "styled-components";
import type { Theme } from "../styles/theme";

const SearchInput = styled.input<{ $theme: Theme }>`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${props => props.$theme.border};
  background-color: ${props => props.$theme.inputBg};
  color: ${props => props.$theme.text};
  margin-bottom: 16px;
  width: 100%;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$theme.buttonBg};
  }

  &::placeholder {
    color: ${props => props.$theme.text};
    opacity: 0.6;
  }
`;

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
    <SearchInput
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
      $theme={currentTheme}
    />
  );
}
