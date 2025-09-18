import { create } from "zustand";
import type { ThemeName } from "../styles/theme";

type ThemeState = {
  themeName: ThemeName;
  toggleTheme: () => void;
  setTheme: (t: ThemeName) => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeName: "light",
  toggleTheme: () =>
    set({ themeName: get().themeName === "light" ? "dark" : "light" }),
  setTheme: (t) => set({ themeName: t }),
}));
