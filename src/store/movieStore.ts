import type { Movie } from '../types/movie';
import { create } from 'zustand';

interface MovieStore {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  setMovies: (movies: Movie[]) => void;
  addMovie: (movie: Movie) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  isLoading: false,
  error: null,
  
  setMovies: (movies) => set({ movies }),
  
  addMovie: (movie) => set((state) => ({ 
    movies: [...state.movies, movie] 
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null })
}));