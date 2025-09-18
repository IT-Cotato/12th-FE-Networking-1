import React, { useState, useMemo } from "react";
import { themes, type ThemeName } from "../styles/theme";
import type { Movie } from "../types/Movie";

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  themeName: ThemeName;
}

function MovieList({ movies, isLoading, themeName }: MovieListProps) {
  const currentTheme = themes[themeName];
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

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

      {isLoading && <div>로딩 중...</div>}

      {!isLoading && filteredMovies.length === 0 ? (
        <div>등록된 영화가 없습니다.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredMovies.map((movie) => (
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
