import React from "react";
import styled from "styled-components";
import { Header } from "./components/Header";
import { MovieForm } from "./components/MovieForm";
import { MovieList } from "./components/MovieList";
import { useThemeStore } from "./store/themeStore";
import { useMovieList } from "./hooks/useMovieList";
import { useAddMovie } from "./hooks/useAddMovie";
import { useMovieError } from "./hooks/useMovieError";
import type { Movie } from "./types/movie";

const AppContainer = styled.div<{ $theme: any }>`
  background: ${props => props.$theme.background};
  color: ${props => props.$theme.text};
  min-height: 100vh;
  padding: 20px;
  transition: all 0.2s ease;
`;

const ErrorMessage = styled.div<{ $theme: any }>`
  background-color: ${props => props.$theme.errorBg};
  color: ${props => props.$theme.errorText};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

function App() {
  const { currentTheme } = useThemeStore();
  const { error, handleError, clearError } = useMovieError();
  const { movies, isLoading: listLoading, refetch } = useMovieList({
    onError: handleError,
  });
  const { addMovie, isLoading: addLoading } = useAddMovie();

  const handleAddMovie = async (newMovie: Omit<Movie, "id">) => {
    try {
      clearError();
      const savedMovie = await addMovie(newMovie);
      await refetch(); // 영화 추가 후 목록 새로고침
      return savedMovie;
    } catch (err) {
      handleError(err);
      throw err;
    }
  };


  return (
    <AppContainer $theme={currentTheme}>
      <Header />
      {error && (
        <ErrorMessage $theme={currentTheme}>
          {error}
        </ErrorMessage>
      )}
      <MovieForm 
        onAddMovie={handleAddMovie}
        isLoading={addLoading}
      />
      <MovieList 
        movies={movies}
        isLoading={listLoading}
      />
    </AppContainer>
  );
}

export default App;
