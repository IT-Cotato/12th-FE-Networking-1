import { create } from 'zustand';
import { type Movie } from '../types/Movie';

interface MovieState {
  movies: Movie[];
  filteredMovies: Movie[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  
  // 액션들
  setMovies: (movies: Movie[]) => void;
  setSearchTerm: (term: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addMovie: (movie: Movie) => void;
  fetchMovies: () => Promise<void>;
  addNewMovie: (newMovie: Omit<Movie, 'id'>) => Promise<void>;
}

export const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  filteredMovies: [],
  searchTerm: '',
  isLoading: false,
  error: null,

  setMovies: (movies) => set({ movies }),
  
  // 영화 검색하기
  setSearchTerm: (term) => {
    const { movies } = get();
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(term.toLowerCase())
    );
    set({ searchTerm: term, filteredMovies: filtered });
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  addMovie: (movie) => {
    const { movies } = get();
    set({ movies: [...movies, movie] });
  },
  
  // 영화 조회하기
  fetchMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/movies");
      if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
      const data: Movie[] = await res.json();
      set({ movies: data, filteredMovies: data, isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      set({ error: errorMessage, isLoading: false });
    }
  },
  
  // 영화 추가하기
  addNewMovie: async (newMovie) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      
      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");
      
      const savedMovie: Movie = await res.json();
      const { movies } = get();
      const updatedMovies = [...movies, savedMovie];
      set({ 
        movies: updatedMovies, 
        filteredMovies: updatedMovies,
        isLoading: false 
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      set({ error: errorMessage, isLoading: false });
    }
  },
}));