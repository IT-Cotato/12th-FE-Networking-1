import { useState } from "react";
import { themes, type ThemeName } from "./styles/theme";
import Header from "./components/Header";
import MovieForm from "./components/movies/MovieForm";
import SearchBar from "./components/movies/SearchBar";
import MovieList from "./components/movies/MovieList";
import ErrorMessage from "./components/messages/ErrorMessage";
import LoadingMessage from "./components/messages/LoadingMessage";
import EmptyMessage from "./components/messages/EmptyMessage";
import { useMovies } from "./hooks/useMovies";
import { useMovieForm } from "./hooks/useMovieForm";
import { useMovieSearch } from "./hooks/useMovieSearch";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const { movies, setMovies, error, isLoading } = useMovies();
  const movieForm = useMovieForm(setMovies);
  const { searchTerm, setSearchTerm, filteredMovies } = useMovieSearch(movies);
  const currentTheme = themes[themeName];

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.2s ease",
      }}
    >
      <Header themeName={themeName} setThemeName={setThemeName} />
      {error && <ErrorMessage message={error} currentTheme={currentTheme} />}

      <MovieForm currentTheme={currentTheme} {...movieForm} />
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: currentTheme.componentBg,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        <h2>영화 목록</h2>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentTheme={currentTheme}
        />
        {isLoading ? (
          <LoadingMessage currentTheme={currentTheme} />
        ) : filteredMovies.length === 0 ? (
          <EmptyMessage currentTheme={currentTheme} />
        ) : (
          <MovieList movies={filteredMovies} currentTheme={currentTheme} />
        )}
      </div>
    </div>
  );
}

export default App;
