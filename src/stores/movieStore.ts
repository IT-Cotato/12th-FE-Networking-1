import { create } from "zustand";

export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

type NewMovie = Omit<Movie, "id">;

type MovieState = {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  hasLoadedOnce: boolean;
  fetchMovies: () => Promise<void>;
  addMovie: (payload: NewMovie) => Promise<void>;
  resetError: () => void;
};

export const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  isLoading: false,
  error: null,
  hasLoadedOnce: false,

  fetchMovies: async () => {
    const { hasLoadedOnce } = get();
    if (hasLoadedOnce) return; // 중복 요청 방지
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/movies");
      if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
      const data: Movie[] = await res.json();
      set({ movies: data, hasLoadedOnce: true });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : String(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  addMovie: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");
      const saved = (await res.json()) as Movie;
      set({ movies: [...get().movies, saved] });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : String(e) });
    } finally {
      set({ isLoading: false });
    }
  },

  resetError: () => set({ error: null }),
}));
