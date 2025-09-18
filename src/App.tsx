import React, { useState, useEffect } from "react";
import { themes, type ThemeName } from "./styles/theme";
import type { Movie } from "./types/movie";
import { Header } from "./components/Header";
import { MovieForm } from "./components/MovieForm";
import { MovieList } from "./components/MovieList";

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

  const handleAddMovie = async (newMovie: Omit<Movie, "id">) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");

      const savedMovie: Movie = await res.json();
      setMovies((prev) => [...prev, savedMovie]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      throw err; // 에러를 다시 throw해서 MovieForm에서 처리할 수 있도록
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
      <Header 
        themeName={themeName}
        currentTheme={currentTheme}
        onThemeToggle={() => setThemeName(themeName === "light" ? "dark" : "light")}
      />
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
      <MovieForm 
        currentTheme={currentTheme}
        onAddMovie={handleAddMovie}
        isLoading={isLoading}
      />
      <MovieList 
        movies={movies}
        currentTheme={currentTheme}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
