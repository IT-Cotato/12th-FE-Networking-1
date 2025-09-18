import React from "react";
import { themes, type ThemeName } from "../../styles/theme";
import type { Movie } from "../../types/Movie";
import SearchBar from "../SearchBar";
import { useMovieSearch } from "../../hooks/useMovieSearch";

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  themeName: ThemeName;
}

function MovieList({ movies, isLoading, themeName }: MovieListProps) {
  const currentTheme = themes[themeName];
  const { query, results, searchMovies } = useMovieSearch(movies);

  return (
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
        searchTerm={query}
        setSearchTerm={searchMovies}
        themeName={themeName}
      />

      {isLoading && <div>로딩 중...</div>}

      {!isLoading && results.length === 0 ? (
        <div>등록된 영화가 없습니다.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {results.map((movie) => (
            <div
              key={movie.id}
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: currentTheme.hoverBg,
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span>
                {movie.title} ({movie.year}) - {movie.director}
              </span>
              <span>장르: {movie.genre}</span>
              <span>⭐: {movie.rating}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
