// src/components/movies/MovieList.tsx
import React from "react";
import styled from "styled-components";
import type { Movie } from "../../types/movie";

interface MovieListProps {
  movies: Movie[];
}

// 컨테이너
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 각 영화 카드
const MovieCard = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.hoverBg};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ListContainer>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
          <span>
            {movie.title} ({movie.year}) - {movie.director}
          </span>
          <span>장르: {movie.genre}</span>
          <span>⭐: {movie.rating}</span>
        </MovieCard>
      ))}
    </ListContainer>
  );
};

export default MovieList;
