import type { Movie } from '../types/movie';
import React from 'react';
import { SearchBar } from './SearchBar';
import type { Theme } from '../styles/theme';

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentTheme: Theme;
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading,
  searchTerm,
  onSearchChange,
  currentTheme
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
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
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