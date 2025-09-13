import { create } from "zustand";
import { type ThemeName } from "../styles/theme";

interface ThemeState {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  themeName: "light",
  toggleTheme: () =>
    set((state) => ({
      themeName: state.themeName === "light" ? "dark" : "light",
    })),
}));
