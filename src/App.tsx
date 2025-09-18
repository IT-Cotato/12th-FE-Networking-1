import React from "react";
import { themes } from "./styles/theme";
import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import { useMovies } from "./hooks/useMovies";
import { useMovieSearch } from "./hooks/useMovieSearch";
import { useTheme, ThemeProvider } from "./context/ThemeContext";

function AppContent() {
  const { state, dispatch } = useTheme();
  const { themeName } = state;

  const { movies, isLoading, error, addMovie } = useMovies();
  const { searchTerm, setSearchTerm, filteredMovies } = useMovieSearch(movies);

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
        onToggleTheme={() => dispatch({ type: "TOGGLE_THEME" })}
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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
