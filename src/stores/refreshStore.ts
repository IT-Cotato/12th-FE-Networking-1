import { create } from "zustand";

interface refreshStoreState {
  movieList: number;
  updateMovieList: () => void;
}

export const useRefreshStore = create<refreshStoreState>((set, get) => ({
  movieList: 0,
  updateMovieList: () => {
    const movieList = get().movieList;
    set({ movieList: movieList + 1 });
  },
}));
