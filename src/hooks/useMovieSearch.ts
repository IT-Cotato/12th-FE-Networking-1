import { useState, useMemo } from "react";
import type { Movie } from "../types/movie";

export function useMovieSearch(movies: Movie[], initialSearch = "") {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const filteredMovies = useMemo(() => {
    if (!searchTerm) return movies;
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  return { searchTerm, setSearchTerm, filteredMovies };
}
