// src/hooks/useMovie.ts
import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";
import { useMovieStore } from "../store/movieStore";

export function useMovies() {
  const { setMovies } = useMovieStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  useEffect(() => {
    fetchMovies();
  }, []);
  return { error, isLoading, refetch: fetchMovies };
}
