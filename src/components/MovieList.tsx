import React, { useState, useMemo } from "react";
import styled from "styled-components";
import type { Theme } from "../styles/theme";
import type { Movie } from "../types/movie";
import { MovieItem } from "./MovieItem";
import { SearchBar } from "./SearchBar";

const ListContainer = styled.div<{ $theme: Theme }>`
  padding: 20px;
  border-radius: 12px;
  background-color: ${props => props.$theme.componentBg};
  border: 1px solid ${props => props.$theme.border};
`;

const ListTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.01em;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  opacity: 0.7;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  opacity: 0.7;
`;

const MoviesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

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
    <ListContainer $theme={currentTheme}>
      <ListTitle>영화 목록</ListTitle>
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentTheme={currentTheme}
        placeholder="영화 제목으로 검색..."
      />
      {isLoading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : filteredMovies.length === 0 ? (
        <EmptyMessage>영화가 없습니다</EmptyMessage>
      ) : (
        <MoviesGrid>
          {filteredMovies.map((movie: Movie) => (
            <MovieItem 
              key={movie.id}
              movie={movie}
              currentTheme={currentTheme}
            />
          ))}
        </MoviesGrid>
      )}
    </ListContainer>
  );
}
