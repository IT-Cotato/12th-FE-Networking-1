import type { Movie, newMovie } from "../types/movie";

export const getMovies = async () => {
  const res = await fetch("/api/movies");
  if (!res.ok) {
    throw new Error("영화 데이터를 불러오지 못했습니다.");
  }
  const data: Movie[] = await res.json();
  return data;
};

export const postMovie = async (newMovie: newMovie) => {
  const res = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMovie),
  });
  if (!res.ok) {
    throw new Error("영화를 추가하지 못했습니다.");
  }
  const savedMovie: Movie = await res.json();
  return savedMovie;
};
