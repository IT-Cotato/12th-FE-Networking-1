import { useEffect, useState, useCallback } from "react";

export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
  poster?: string;
}

export type NewMovie = Omit<Movie, "id" | "poster">;

/** 영화 목록 조회/추가 + 로딩/에러 상태 훅 */
export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const posterFromTitle = (title: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(title)}/240/360`;

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/movies");
      if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
      const data: Movie[] = await res.json();
      setMovies(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMovie = useCallback(async (newMovie: NewMovie) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");
      const saved: Movie = await res.json();
      //저장 후 프론트에서 poster만 합성
      const withPoster = { ...saved, poster: posterFromTitle(saved.title) };
      setMovies((prev) => [...prev, saved]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, isLoading, error, setError, addMovie, refetch: fetchMovies };
}

export default useMovies;
