import { create } from "zustand";

interface searchStoreState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const useSearchStore = create<searchStoreState>((set) => ({
  searchTerm: "",
  setSearchTerm: (searchTerm: string) => {
    set({ searchTerm });
  },
}));
