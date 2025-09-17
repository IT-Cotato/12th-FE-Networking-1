import { useState } from "react";
import type { NewMovie } from "./useMovies";

/*영화 추가 폼 상태/검증/제출 로직*/
export function useMovieForm(
  onSubmit: (payload: NewMovie) => Promise<void> | void
) {
  // 필드 상태
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<number | "">("");

  // 에러 상태
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setTitle("");
    setDirector("");
    setYear("");
    setGenre("");
    setRating("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 기본 검증
    if (!title || !director || !year || !genre || rating === "") {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    const numYear = Number(year);
    const numRating = Number(rating);

    if (Number.isNaN(numYear) || numYear < 1800 || numYear > 2100) {
      setError("연도는 1800~2100 사이의 숫자여야 합니다.");
      return;
    }
    if (Number.isNaN(numRating) || numRating < 0 || numRating > 10) {
      setError("평점은 0~10 사이의 숫자여야 합니다.");
      return;
    }

    const payload: NewMovie = {
      title,
      director,
      year: numYear,
      genre,
      rating: numRating,
    };

    try {
      await onSubmit(payload);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "제출 중 오류가 발생했습니다.");
    }
  };

  return {
    // 값/세터들 모아서 반환
    fields: { title, director, year, genre, rating },
    setters: { setTitle, setDirector, setYear, setGenre, setRating },
    error,
    setError,
    handleSubmit,
    reset,
  };
}

export default useMovieForm;
