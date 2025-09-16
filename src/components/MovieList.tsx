import React, { useMemo } from "react";
import type { Theme } from "../styles/theme";
import type { Movie } from "../hooks/useMovies";

export type MovieListProps = {
  theme: Theme;
  movies: Movie[];
  isLoading: boolean;
  searchTerm: string;
};

function MovieList({ theme, movies, isLoading, searchTerm }: MovieListProps) {
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().includes(q));
  }, [movies, searchTerm]);

  return (
    <section
      style={{
        padding: 20,
        borderRadius: 12,
        background: theme.componentBg,
        border: `1px solid ${theme.border}`,
      }}
    >
      <h2>영화 목록</h2>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : filtered.length === 0 ? (
        <div>영화가 없습니다</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((movie) => (
            <div
              key={movie.id}
              style={{
                padding: 12,
                borderRadius: 8,
                background: theme.hoverBg,
                display: "flex",
                flexDirection: "column",
                gap: 4,
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
    </section>
  );
}

export default MovieList;
