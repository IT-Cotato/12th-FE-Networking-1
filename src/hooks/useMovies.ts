import { useEffect, useState } from 'react';
import type { Movie } from '@/types/movie';

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/movies');
      if (!res.ok) throw new Error('영화 데이터를 불러오지 못했습니다.');
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

  return { movies, setMovies, isLoading};
};
