import React from "react";
import type { Theme } from "../styles/theme";
import type { Movie } from "../types/movie";

interface MovieItemProps {
  movie: Movie;
  currentTheme: Theme;
}

export function MovieItem({ movie, currentTheme }: MovieItemProps) {
  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: currentTheme.hoverBg,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        transition: "background-color 0.2s ease",
      }}
    >
      <span>
        {movie.title} ({movie.year}) - {movie.director}
      </span>
      <span>장르: {movie.genre}</span>
      <span>⭐: {movie.rating}</span>
    </div>
  );
}
