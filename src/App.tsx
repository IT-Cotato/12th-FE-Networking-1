// src/App.tsx
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "./store/themeStore";
import { themes } from "./styles/theme";

import Header from "./components/Header";
import MovieForm from "./components/movies/MovieForm";
import SearchBar from "./components/movies/SearchBar";
import MovieList from "./components/movies/MovieList";
import ErrorMessage from "./components/messages/ErrorMessage";
import LoadingMessage from "./components/messages/LoadingMessage";
import EmptyMessage from "./components/messages/EmptyMessage";

import { useMovies } from "./hooks/useMovies";
import { useMovieForm } from "./hooks/useMovieForm";
import { useMovieSearch } from "./hooks/useMovieSearch";
import { useMovieStore } from "./store/movieStore";

import styled from "styled-components";

const AppContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  padding: 20px;
  transition: all 0.2s ease;
`;

const MovieSection = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.componentBg};
  border: 1px solid ${({ theme }) => theme.border};
`;

function App() {
  const { themeName, setThemeName } = useThemeStore();
  const currentTheme = themes[themeName];

  const { movies } = useMovieStore();
  const { searchTerm, setSearchTerm, filteredMovies } = useMovieSearch(movies);
  const { error, isLoading } = useMovies();
  const movieForm = useMovieForm();

  return (
    <ThemeProvider theme={currentTheme}>
      <AppContainer>
        <Header themeName={themeName} setThemeName={setThemeName} />
        {error && <ErrorMessage message={error} />}
        <MovieForm {...movieForm} />

        <MovieSection>
          <h2>영화 목록</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {isLoading ? (
            <LoadingMessage />
          ) : filteredMovies.length === 0 ? (
            <EmptyMessage />
          ) : (
            <MovieList movies={filteredMovies} />
          )}
        </MovieSection>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
