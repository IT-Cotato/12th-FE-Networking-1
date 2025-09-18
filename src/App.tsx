import React, { useState, useEffect, useMemo, useContext } from "react";
import { themes } from "./styles/theme";
import Header from "./components/Header";
import ThemeButton from "./components/ThemeButton";
import { useTheme } from "./hooks/useTheme";
import InputField from "./components/InputField";
import { useFetch } from "./hooks/useFetch";
import { getMovies, postMovie } from "./apis/movieApi";
import type { Movie, NewMovie, NewMovieInputType } from "./types/movie";
import { useMutation } from "./hooks/useMutation";
import ErrorMessage from "./components/ErrorMessage";
import AddMovieForm from "./components/AddMovieForm";
import MovieCard from "./components/MovieCard";
import SearchBox from "./components/SearchBox";
import { useSearchStore } from "./stores/searchStore";
import { useShallow } from "zustand/shallow";
import MovieCardList from "./components/MovieCardList";
import Container from "./components/Container";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const { currentTheme } = useTheme();

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.2s ease",
      }}
    >
      <Header flexRowJustifyContent="end" title="코테이토 영화관">
        <ThemeButton />
      </Header>

      <Container title="영화 추가">
        <AddMovieForm />
      </Container>

      <Container title="영화 목록">
        <SearchBox />
        <MovieCardList />
      </Container>
    </div>
  );
}

export default App;
