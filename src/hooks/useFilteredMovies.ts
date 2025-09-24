import { useMemo, useState } from 'react';

import type { Movie } from '@/types/movie';

export function useFilteredMovies(movies: Movie[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [movies, searchTerm]);

  return { searchTerm, setSearchTerm, filteredMovies };
}
