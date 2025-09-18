import { useState } from 'react';
import type { Movie } from '../types/movie';

export function useAddMovie() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addMovie = async (newMovie: Omit<Movie, "id">): Promise<Movie> => {
    try {
      setIsLoading(true);
      
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");

      const savedMovie: Movie = await res.json();
      return savedMovie;
    } catch (err: unknown) {
      console.error('Failed to add movie:', err);
      throw err; // 에러를 상위로 전달
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addMovie,
    isLoading,
  };
}
