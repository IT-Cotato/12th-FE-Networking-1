import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";

const STORAGE_KEY = "movies/v1";

const hydrate = (): Movie[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persist = (movies: Movie[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>(() => hydrate());

  useEffect(() => {
    persist(movies);
  }, [movies]);

  const addMovie = (m: Omit<Movie, "id">) => {
    const newMovie: Movie = {
      id: Date.now(),
      ...m,
    };
    setMovies((prev) => [newMovie, ...prev]);
  };

  const removeMovie = (id: number) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  return { movies, addMovie, removeMovie };
};
