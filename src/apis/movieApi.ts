import type { Movie } from "../types/movie";

export const getMovies = async () => {
  const res = await fetch("/api/movies");
  if (!res.ok) {
    throw new Error("영화 데이터를 불러오지 못했습니다.");
  }
  const data: Movie[] = await res.json();
  return data;
};
