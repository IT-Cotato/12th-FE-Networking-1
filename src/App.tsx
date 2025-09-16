import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import Header from "./components/Header";
import MovieForm from "./components/movies/MovieForm";
import SearchBar from "./components/movies/SearchBar";
import MovieList from "./components/movies/MovieList";
import ErrorMessage from "./components/messages/ErrorMessage";
import LoadingMessage from "./components/messages/LoadingMessage";
import EmptyMessage from "./components/messages/EmptyMessage";
import type { Movie } from "./types/movie";
import { useMovies } from "./hooks/useMovies";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const { movies, setMovies, refetch } = useMovies();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentTheme = themes[themeName];

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    const newMovie = {
      title: newTitle,
      director: newDirector,
      year: Number(newYear),
      genre: newGenre,
      rating: Number(newRating),
    };

    try {
      setIsLoading(true);
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");

      const savedMovie: Movie = await res.json();
      setMovies((prev) => [...prev, savedMovie]);
      setNewTitle("");
      setNewDirector("");
      setNewYear("");
      setNewGenre("");
      setNewRating("");
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <Header themeName={themeName} setThemeName={setThemeName} />
      {error && <ErrorMessage message={error} currentTheme={currentTheme} />}

      <MovieForm
        currentTheme={currentTheme}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newDirector={newDirector}
        setNewDirector={setNewDirector}
        newYear={newYear}
        setNewYear={setNewYear}
        newGenre={newGenre}
        setNewGenre={setNewGenre}
        newRating={newRating}
        setNewRating={setNewRating}
        handleAddMovie={handleAddMovie}
      />
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: currentTheme.componentBg,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        <h2>영화 목록</h2>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentTheme={currentTheme}
        />
        {isLoading ? (
          <LoadingMessage currentTheme={currentTheme} />
        ) : filteredMovies.length === 0 ? (
          <EmptyMessage currentTheme={currentTheme} />
        ) : (
          <MovieList movies={filteredMovies} currentTheme={currentTheme} />
        )}
      </div>
    </div>
  );
}

export default App;
