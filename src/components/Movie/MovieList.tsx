import React from "react";
import { themes, type ThemeName } from "../../styles/theme";
import type { Movie } from "../../types/Movie";
import SearchBar from "../SearchBar";
import { useMovieSearch } from "../../hooks/useMovieSearch";

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  themeName: ThemeName;
  onDeleteMovie: (movieId: number) => void;
}

function MovieList({ movies, isLoading, themeName, onDeleteMovie }: MovieListProps) {
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
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
                <span>
                  {movie.title} ({movie.year}) - {movie.director}
                </span>
                <span>장르: {movie.genre}</span>
                <span>⭐: {movie.rating}</span>
              </div>
              <button
                onClick={() => onDeleteMovie(movie.id)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#ff4757",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                  minWidth: "50px",
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
