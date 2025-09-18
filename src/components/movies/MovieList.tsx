// src/components/movies/MovieList.tsx
import React from "react";
import styled from "styled-components";
import type { Movie } from "../../types/movie";

interface MovieListProps {
  movies: Movie[];
}

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

const MovieCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.hoverBg};
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 150px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    background-color: ${({ theme }) => theme.cardhoverBg};
  }
`;

const Stars = styled.div`
  color: gold;
  font-size: 16px;
`;

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const renderStars = (rating: number) => {
    const stars = (rating / 10) * 5;
    const fullStars = Math.floor(stars);
    const halfStar = stars - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar ? "⯪" : ""}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <ListContainer>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
          <strong>{movie.title}</strong>
          <span>
            ({movie.year}) - {movie.director}
          </span>
          <span>장르: {movie.genre}</span>
          <Stars>{renderStars(movie.rating)}</Stars>
        </MovieCard>
      ))}
    </ListContainer>
  );
};

export default MovieList;
