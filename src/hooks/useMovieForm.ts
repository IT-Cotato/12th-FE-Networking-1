import { useState } from "react";
import type { Movie } from "../types/Movie";

export function useMovieForm() {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  // 입력창 검증
  const validateForm = () => {
    if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) {
      setError("모든 필드를 입력해주세요.");
      return false;
    }
    setError(null);
    return true;
  };

  // 입력창 초기화
  const resetForm = () => {
    setNewTitle("");
    setNewDirector("");
    setNewYear("");
    setNewGenre("");
    setNewRating("");
    setError(null);
  };

  // 영화 데이터 생성
  const createMovieData = (): Omit<Movie, "id"> => {
    return {
      title: newTitle,
      director: newDirector,
      year: Number(newYear),
      genre: newGenre,
      rating: Number(newRating),
    };
  };

  return {
    formData: {
      newTitle,
      newDirector,
      newYear,
      newGenre,
      newRating,
    },
    error,
    setNewTitle,
    setNewDirector,
    setNewYear,
    setNewGenre,
    setNewRating,
    validateForm,
    resetForm,
    createMovieData,
    setError,
  };
}
