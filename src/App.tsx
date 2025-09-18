import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import Header from "./components/Header";
import ErrorBox from "./components/ErrorBox";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import { useThemeStore } from "./stores/themeStore";
import { useMovieStore } from "./stores/movieStore";

function App() {
  // 전역: 테마
  const themeName = useThemeStore((s) => s.themeName);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const currentTheme = themes[themeName];

  // 전역: 영화 서버 스테이트
  const movies = useMovieStore((s) => s.movies);
  const isLoading = useMovieStore((s) => s.isLoading);
  const error = useMovieStore((s) => s.error);
  const fetchMovies = useMovieStore((s) => s.fetchMovies);

  // 로컬: 검색어만 로컬
  const [searchTerm, setSearchTerm] = useState<string>(""); // 영화 검색 상태

  // 영화 목록을 불러오는 hook
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // 검색 시 필터링 해주는 hook
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  return (
    // 전체를 div 태그로 감싸서 스타일링
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        margin: "0px",
        padding: "20px",
        transition: "all 0.2s ease",
      }}
    >
      {/* 상단 제목과 다크모드를 담당하는 헤더 스타일링 */}
      <Header
        themeName={themeName}
        toggleTheme={toggleTheme}
        currentTheme={currentTheme}
      />
      <ErrorBox error={error} currentTheme={currentTheme} />
      {/* 영화 페이지 두번째 목록을 담당하는 부분 */}
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
