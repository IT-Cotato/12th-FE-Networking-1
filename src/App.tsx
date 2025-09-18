import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import { Header } from "./components/Header";
import { ErrorMessage } from "./components/ErrorMessage";
import { MovieForm } from "./components/MovieForm";
import { MovieList } from "./components/MovieList";
import { type Movie } from "./types/Movie";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState<string>("");
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
      {/* Header 호출 */}
      <Header 
        themeName={themeName} 
        onThemeToggle={() => setThemeName(themeName === "light" ? "dark" : "light")} 
        currentTheme={currentTheme} 
      />

      {/* ErrorMessage 호출 */}
      <ErrorMessage 
        error={error}
        currentTheme={currentTheme}
      />

      {/* MovieForm 호출 */}
      <MovieForm
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
        onSubmit={handleAddMovie}
        currentTheme={currentTheme}
      />

      {/* MovieList 호출 */}
      <MovieList
        movies={filteredMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        currentTheme={currentTheme}
      />

    </div>
  );
}

export default App;
