import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
        const data: Movie[] = await res.json();
        setMovies(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const addMovie = async (newMovie: Omit<Movie, "id">) => {
    setIsLoading(true);
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
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return { movies, isLoading, error, addMovie };
}
