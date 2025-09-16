import React, { useState } from "react";
import { themes, type ThemeName } from "@/styles/theme";

import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { useMovies } from "./hooks/useMovies";


function App() {
  // 테마 상태
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const theme = themes[themeName];

  // 영화 상태 (커스텀 훅)
  const { movies, isLoading, error, setError, addMovie } = useMovies();

  // 검색 상태
  const [search, setSearch] = useState("");

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        minHeight: "100vh",
        padding: 20,
        transition: "all 0.2s ease",
      }}
    >
      {/* 헤더 */}
      <Header
        theme={theme}
        themeName={themeName}
        onToggleTheme={() =>
          setThemeName(themeName === "light" ? "dark" : "light")
        }
      />

      {/* 에러 메시지 */}
      {error && (
        <div
          style={{
            background: theme.errorBg,
            color: theme.errorText,
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      {/* 영화 추가 폼 */}
      <MovieForm theme={theme} onAdd={addMovie} />

      {/* 검색창 */}
      <section
        style={{
          padding: 20,
          borderRadius: 12,
          background: theme.componentBg,
          border: `1px solid ${theme.border}`,
          marginBottom: 20,
        }}
      >
        <h2>영화 검색</h2>
        <SearchBar theme={theme} value={search} onChange={setSearch} />
      </section>

      {/* 영화 목록 */}
      <MovieList
        theme={theme}
        movies={movies}
        isLoading={isLoading}
        searchTerm={search}
      />
    </div>
  );
}

export default App;

