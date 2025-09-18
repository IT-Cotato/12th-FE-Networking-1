import React from "react";
import styled from "styled-components";
import { Header } from "./components/Header";
import { MovieForm } from "./components/MovieForm";
import { MovieList } from "./components/MovieList";
import { useThemeStore } from "./store/themeStore";
import { useMovies } from "./hooks/useMovies";

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
  const { movies, error, isLoading, addMovie } = useMovies();

  return (
    <AppContainer $theme={currentTheme}>
      <Header />
      {error && (
        <ErrorMessage $theme={currentTheme}>
          {error}
        </ErrorMessage>
      )}
      <MovieForm 
        onAddMovie={addMovie}
        isLoading={isLoading}
      />
      <MovieList 
        movies={movies}
        isLoading={isLoading}
      />
    </AppContainer>
  );
}

export default App;
