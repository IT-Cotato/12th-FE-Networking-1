import { create } from "zustand";
import type { ThemeName } from "../styles/theme";

interface ThemeState {
  mode: ThemeName;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "light",
  toggle: () => set({ mode: get().mode === "light" ? "dark" : "light" }),
}));
