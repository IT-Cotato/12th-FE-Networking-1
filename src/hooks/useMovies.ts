import { useEffect, useMemo, useState } from "react";
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

  const addMovie = (m: Omit<Movie, "id" | "createdAt">) => {
    const newMovie: Movie = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...m,
    };
    setMovies((prev) => [newMovie, ...prev]);
  };

  const removeMovie = (id: string) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  // 최신 작성순으로 정렬해서 반환
  const sorted = useMemo(
    () => [...movies].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [movies]
  );

  return { movies: sorted, addMovie, removeMovie };
};
