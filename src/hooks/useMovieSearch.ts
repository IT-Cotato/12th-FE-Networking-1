// src/hooks/useMovieSearch.ts
import { useState, useMemo } from "react";
import type { Movie } from "../types/movie";

export function useMovieSearch(movies: Movie[]) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);
  return { searchTerm, setSearchTerm, filteredMovies };
}
