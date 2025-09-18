import React, { useState, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const { movies, isLoading, error, addMovie } = useMovies();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovies = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().includes(q));
  }, [movies, searchTerm]);

  const currentTheme = themes[themeName];

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <Header
        themeName={themeName}
        onToggleTheme={() =>
          setThemeName(themeName === "light" ? "dark" : "light")
        }
      />

      <MovieForm onAddMovie={addMovie} themeName={themeName} />

      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: currentTheme.componentBg,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        <h2>영화 목록</h2>
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
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <MovieList movies={filteredMovies} themeName={themeName} />
        )}
        {error && (
          <div
            style={{
              backgroundColor: currentTheme.errorBg,
              color: currentTheme.errorText,
              padding: "12px",
              borderRadius: "8px",
              marginTop: "12px",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
