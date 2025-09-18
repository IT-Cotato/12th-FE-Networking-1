import { useMemo, useState } from 'react';

import type { Movie } from '../types/movie';

export const useMovieSearch = (movies: Movie[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredMovies
  };
};