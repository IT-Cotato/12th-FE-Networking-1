import { themes, type ThemeName } from "../styles/theme";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  themeName: ThemeName;
}

function SearchBar({ searchTerm, setSearchTerm, themeName }: SearchBarProps) {
  const currentTheme = themes[themeName];

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
}

export default SearchBar;
