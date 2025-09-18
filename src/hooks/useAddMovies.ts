import { useCallback } from "react";

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

type Params = {
  newTitle: string;
  newDirector: string;
  newYear: number | "";
  newGenre: string;
  newRating: number | "";
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  setNewDirector: React.Dispatch<React.SetStateAction<string>>;
  setNewYear: React.Dispatch<React.SetStateAction<number | "">>;
  setNewGenre: React.Dispatch<React.SetStateAction<string>>;
  setNewRating: React.Dispatch<React.SetStateAction<number | "">>;
};

export function useAddMovie({
  newTitle,
  newDirector,
  newYear,
  newGenre,
  newRating,
  setError,
  setIsLoading,
  setMovies,
  setNewTitle,
  setNewDirector,
  setNewYear,
  setNewGenre,
  setNewRating,
}: Params) {
  return useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) {
        setError("모든 필드를 입력해주세요.");
        return;
      }

      const newMovie = {
        title: newTitle,
        director: newDirector,
        year: Number(newYear),
        genre: newGenre,
        rating: Number(newRating),
      };

      try {
        setIsLoading(true);
        const res = await fetch("/api/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMovie),
        });
        if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");

        const savedMovie: Movie = await res.json();
        setMovies((prev) => [...prev, savedMovie]);

        // 입력값 초기화
        setNewTitle("");
        setNewDirector("");
        setNewYear("");
        setNewGenre("");
        setNewRating("");
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      newTitle,
      newDirector,
      newYear,
      newGenre,
      newRating,
      setError,
      setIsLoading,
      setMovies,
      setNewTitle,
      setNewDirector,
      setNewYear,
      setNewGenre,
      setNewRating,
    ]
  );
}
