import React from "react";
import type { Movie } from "../types/movie";
import type { ThemeName } from "../styles/theme";
import { themes } from "../styles/theme";

interface MovieItemProps {
  movie: Movie;
  themeName?: ThemeName;
}

export default function MovieItem({
  movie,
  themeName = "light",
}: MovieItemProps) {
  const theme = themes[themeName];

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: theme.hoverBg,
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
  );
}
