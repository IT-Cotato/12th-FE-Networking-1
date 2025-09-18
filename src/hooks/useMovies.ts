import { useEffect } from 'react';
import { useMovieStore } from '../store/movieStore';

import type { Movie } from '../types/movie';

export const useMovies = () => {
  const { 
    movies, 
    isLoading, 
    error, 
    setMovies, 
    addMovie: addMovieToStore, 
    setLoading, 
    setError,
    clearError 
  } = useMovieStore();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
        const data: Movie[] = await res.json();
        setMovies(data);
        clearError();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [setMovies, setLoading, setError, clearError]);

  const addMovie = async (newMovie: Omit<Movie, 'id'>) => {
    try {
      setLoading(true);
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");

      const savedMovie: Movie = await res.json();
      addMovieToStore(savedMovie);
      clearError();
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    error,
    isLoading,
    addMovie,
    setError
  };
};