import { type Movie, type NewMovie } from "@/types/movie";

export const fetchMovies = async (): Promise<Movie[]> => {
  const res = await fetch("/api/movies");
  if (!res.ok) {
    throw new Error("영화 데이터를 불러오지 못했습니다.");
  }
  return res.json();
};

export const addMovie = async (newMovie: NewMovie): Promise<Movie> => {
  const res = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMovie),
  });
  if (!res.ok) {
    throw new Error("영화를 추가하지 못했습니다.");
  }
  return res.json();
};
