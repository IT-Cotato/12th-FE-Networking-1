import { create } from "zustand";
import type { ThemeName } from "@/styles/theme"; 

type ThemeState = {
  themeName: ThemeName;
  toggle: () => void;
  set: (name: ThemeName) => void;
};

const STORAGE_KEY = "themeName";

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeName:
    (typeof localStorage !== "undefined" &&
      (localStorage.getItem(STORAGE_KEY) as ThemeName)) || "light",
  toggle: () => {
    const next = get().themeName === "light" ? "dark" : "light";
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
    set({ themeName: next });
  },
  set: (name) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, name);
    }
    set({ themeName: name });
  },
}));
