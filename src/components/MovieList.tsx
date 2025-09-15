import React from "react";
import { themes } from "../styles/theme";

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

interface MovieListProps {
  movies: Movie[];
  currentTheme: typeof themes.light;
}

const MovieList: React.FC<MovieListProps> = ({ movies, currentTheme }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {movies.map((movie) => (
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
  );
};

export default MovieList;
