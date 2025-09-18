// src/store/themeStore.ts
import { create } from "zustand";
import type { ThemeName } from "../styles/theme";

interface ThemeState {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeName: "light",
  setThemeName: (name) => set({ themeName: name }),
}));
