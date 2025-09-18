import { useEffect, useMemo, useState } from "react";
import type { Movie } from "../types/movie";

export function useMoviesApi() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
        const data: Movie[] = await res.json();
        setMovies(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const addMovie = async (payload: Omit<Movie, "id">) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");
      const saved: Movie = await res.json();
      setMovies((prev) => [...prev, saved]);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  };

  const removeMovie = (id: number) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  const sorted = useMemo(() => [...movies], [movies]);

  return { movies: sorted, addMovie, removeMovie, error, setError, isLoading };
}
