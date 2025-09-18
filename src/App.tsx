import React, { useState, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import Header from "./components/Header";
import ErrorBox from "./components/ErrorBox";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import { useMovies } from "./hooks/useMovies";
import { useMovieStore } from "./stores/movieStore";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const currentTheme = themes[themeName];

  // 전역 상태 가져오기
  const { movies, error, isLoading } = useMovies(); // 목록 자동 fetch

  // 검색 필터링
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        margin: "0",
        padding: "20px",
        transition: "all 0.2s ease",
      }}
    >
      <Header
        themeName={themeName}
        toggleTheme={() =>
          setThemeName((prev) => (prev === "light" ? "dark" : "light"))
        }
        currentTheme={currentTheme}
      />

      <ErrorBox error={error} currentTheme={currentTheme} />

      <MovieForm currentTheme={currentTheme} />

      <MovieList
        movies={filteredMovies}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={isLoading}
        currentTheme={currentTheme}
      />
    </div>
  );
}

export default App;
