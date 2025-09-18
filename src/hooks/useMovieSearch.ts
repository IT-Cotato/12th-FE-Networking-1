import { useState, useMemo } from "react";
import type { Movie } from "../types/Movie";

export function useMovieSearch(movies: Movie[]) {
  const [query, setQuery] = useState("");    

  const results = useMemo(() => {
    if (!query.trim()) {
      return movies;
    }
    
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [movies, query]);

  const searchMovies = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return { query, results, searchMovies };
}