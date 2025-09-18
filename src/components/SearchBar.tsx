import React from "react";
import styled from "styled-components";
import { useThemeStore } from "../store/themeStore";

const SearchInput = styled.input<{ $theme: any }>`
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
  placeholder?: string;
}

export function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "검색..." 
}: SearchBarProps) {
  const { currentTheme } = useThemeStore();
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
