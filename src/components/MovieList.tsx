import React from "react";
import type { Movie } from "../types/movie";
import type { ThemeName } from "../styles/theme";
import MovieItem from "./MovieItem";

interface MovieListProps {
  movies: Movie[];
  themeName?: ThemeName;
}

export default function MovieList({
  movies,
  themeName = "light",
}: MovieListProps) {
  if (!movies || movies.length === 0) return <div>영화가 없습니다</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} themeName={themeName} />
      ))}
    </div>
  );
}
