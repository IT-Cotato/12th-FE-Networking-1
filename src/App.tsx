import React, { useState, useEffect, useMemo } from "react";
import type { Movie } from "./types/movie";

import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
        const data: Movie[] = await res.json();
        setMovies(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
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
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className={`${isDark ? "dark" : ""}`}>
  <div className=" p-6 bg-lightBackground text-black dark:bg-darkBackground dark:text-white transition-all duration-200">
      <Header
          isDark={isDark}
          toggleDarkMode={() => setIsDark(!isDark)}
      />
      </div>

      {error && (
       <div className="mb-5 p-3 rounded bg-lightRed text-red dark:bg-deepGray dark:text-pink">
          {error}
        </div>
      )}

      <MovieForm
        isDark={isDark}
        newTitle={newTitle}
        newDirector={newDirector}
        newYear={newYear}
        newGenre={newGenre}
        newRating={newRating}
        onTitleChange={setNewTitle}
        onDirectorChange={setNewDirector}
        onYearChange={setNewYear}
        onGenreChange={setNewGenre}
        onRatingChange={setNewRating}
        onSubmit={handleAddMovie}
      />

      <SearchBar
        isDark={isDark}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <MovieList
        isDark={isDark}
        movies={filteredMovies}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />
    </div>
  );
}

export default App;