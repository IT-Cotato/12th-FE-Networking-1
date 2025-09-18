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

      <div
        style={{
          marginBottom: "24px",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: currentTheme.componentBg,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        <h2>영화 추가</h2>
        <AddMovieForm />
      </div>
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: currentTheme.componentBg,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        <h2>영화 목록</h2>
        <SearchBox />
        <MovieCardList />
      </div>
    </div>
  );
}

export default App;
