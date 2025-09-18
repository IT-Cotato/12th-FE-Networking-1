import React from "react";
import styled from "styled-components";
import type { Movie } from "../types/movie";
import { useThemeStore } from "../store/themeStore";

const ItemContainer = styled.div<{ $theme: any }>`
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
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 1.4;
`;

const MovieInfo = styled.span`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.8;
  line-height: 1.4;
`;

const Rating = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #f59e0b;
`;

interface MovieItemProps {
  movie: Movie;
}

export function MovieItem({ movie }: MovieItemProps) {
  const { currentTheme } = useThemeStore();
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
