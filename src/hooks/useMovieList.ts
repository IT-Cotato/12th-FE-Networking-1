import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';

interface UseMovieListOptions {
  onError?: (error: unknown) => void;
}

export function useMovieList(options?: UseMovieListOptions) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/movies");
      if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
      const data: Movie[] = await res.json();
      setMovies(data);
    } catch (err: unknown) {
      console.error('Failed to fetch movies:', err);
      options?.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    isLoading,
    refetch: fetchMovies,
  };
}
