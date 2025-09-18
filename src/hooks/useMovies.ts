import { useEffect } from "react";
import { useMovieStore } from "../stores/movieStore";

export function useMovies() {
  const { movies, setMovies, setIsLoading, setError } = useMovieStore();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
        const data = await res.json();
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
    fetchMovies();
  }, [setMovies, setIsLoading, setError]);

  return useMovieStore();
}
