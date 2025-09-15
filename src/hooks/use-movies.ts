import { type Movie, type NewMovie } from "@/types/movie";
import { useEffect, useState, useMemo } from "react";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
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

  const addMovie = async (newMovie: NewMovie) => {
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");

      const savedMovie: Movie = await res.json();
      setMovies((prev) => [...prev, savedMovie]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err; // Re-throw the error to be caught by the form
    }
  };

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [movies, searchTerm]);

  return {
    movies: filteredMovies,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    addMovie,
  };
}
