import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

interface MovieStore {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  setMovies: (movies: Movie[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  isLoading: false,
  error: null,
  setMovies: (movies) => set({ movies }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
