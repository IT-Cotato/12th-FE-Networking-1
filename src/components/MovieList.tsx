import React from "react";
import { type Theme } from "../styles/theme";
import SearchBar from "./SearchBar";

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
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isLoading: boolean;
  currentTheme: Theme;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  searchTerm,
  onSearchChange,
  isLoading,
  currentTheme,
}) => {
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
        value={searchTerm}
        onChange={onSearchChange}
        currentTheme={currentTheme}
      />
      {isLoading ? (
        <div>로딩 중...</div>
      ) : movies.length === 0 ? (
        <div>영화가 없습니다</div>
      ) : (
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
      )}
    </div>
  );
};

export default MovieList;
