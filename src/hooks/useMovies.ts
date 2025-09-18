import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/movies");
      if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
      const data: Movie[] = await res.json();
      setMovies(data);
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

  const addMovie = async (newMovie: Omit<Movie, "id">) => {
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
      return savedMovie;
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

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    error,
    isLoading,
    addMovie,
    refetch: fetchMovies,
  };
}
