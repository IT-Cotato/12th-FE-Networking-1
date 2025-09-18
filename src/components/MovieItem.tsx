import React from "react";
import styled from "styled-components";
import type { Theme } from "../styles/theme";
import type { Movie } from "../types/movie";

const ItemContainer = styled.div<{ $theme: Theme }>`
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.$theme.hoverBg};
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const MovieTitle = styled.span`
  font-weight: 500;
`;

const MovieInfo = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

const Rating = styled.span`
  font-weight: 600;
`;

interface MovieItemProps {
  movie: Movie;
  currentTheme: Theme;
}

export function MovieItem({ movie, currentTheme }: MovieItemProps) {
  return (
    <ItemContainer $theme={currentTheme}>
      <MovieTitle>
        {movie.title} ({movie.year}) - {movie.director}
      </MovieTitle>
      <MovieInfo>장르: {movie.genre}</MovieInfo>
      <Rating>⭐: {movie.rating}</Rating>
    </ItemContainer>
  );
}
