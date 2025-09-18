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
      className={`p-2 rounded-lg border mb-4 w-full ${
        themeName === 'light' 
          ? 'bg-white border-gray-300 text-gray-800' 
          : 'bg-gray-700 border-gray-600 text-gray-200'
      }`}
    />
  );
}

export default SearchBar;
