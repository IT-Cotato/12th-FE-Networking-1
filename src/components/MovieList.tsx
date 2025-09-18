import React, { useState, useMemo } from "react";
import type { Theme } from "../styles/theme";
import type { Movie } from "../types/movie";
import { MovieItem } from "./MovieItem";
import { SearchBar } from "./SearchBar";

interface MovieListProps {
  movies: Movie[];
  currentTheme: Theme;
  isLoading: boolean;
}

export function MovieList({ movies, currentTheme, isLoading }: MovieListProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie: Movie) =>
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
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentTheme={currentTheme}
        placeholder="영화 제목으로 검색..."
      />
      {isLoading ? (
        <div>로딩 중...</div>
      ) : filteredMovies.length === 0 ? (
        <div>영화가 없습니다</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredMovies.map((movie: Movie) => (
            <MovieItem 
              key={movie.id}
              movie={movie}
              currentTheme={currentTheme}
            />
          ))}
        </div>
      )}
    </div>
  );
}
