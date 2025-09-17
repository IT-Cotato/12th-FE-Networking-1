import React from "react";
import { type Theme } from "../styles/theme";

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
      {/* 영화 추가한 부분에 대해서 목록으로 나타내는 부분*/}
      <h2>영화 목록</h2>
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
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
