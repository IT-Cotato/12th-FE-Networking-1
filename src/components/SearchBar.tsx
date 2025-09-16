import React from "react";
import type { Theme } from "../styles/theme";

export type SearchBarProps = {
  theme: Theme;
  value: string;
  onChange: (v: string) => void;
};

function SearchBar({ theme, value, onChange }: SearchBarProps) {
  return (
    <input
      placeholder="검색..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: 8,
        borderRadius: 8,
        border: `1px solid ${theme.border}`,
        background: theme.inputBg,
        color: theme.text,
        width: "100%",
        marginBottom: 16,
      }}
    />
  );
}

export default SearchBar;

