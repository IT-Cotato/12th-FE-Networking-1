import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import type { Movie } from "./types/Movie";
import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentTheme = themes[themeName];

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
        const data: Movie[] = await res.json();
        setMovies(data);
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
    fetchMovies();
  }, []);

  const handleAddMovie = async (movie: Omit<Movie, "id">) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");

      const savedMovie: Movie = await res.json();
      setMovies((prev) => [...prev, savedMovie]);
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
      {error && (
        <div
          style={{
            backgroundColor: currentTheme.errorBg,
            color: currentTheme.errorText,
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}
      <MovieForm themeName={themeName} onAddMovie={handleAddMovie} />
      <MovieList movies={movies} isLoading={isLoading} themeName={themeName} />
    </div>
  );
}

export default App;
