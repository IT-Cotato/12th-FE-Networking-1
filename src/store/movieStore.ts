import { create } from "zustand";
import type { Movie } from "../types/movie";

interface MovieState {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  addMovie: (movie: Movie) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  addMovie: (movie) => set((state) => ({ movies: [...state.movies, movie] })),
}));
