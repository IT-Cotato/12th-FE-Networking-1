import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  movies: any[];
  setMovies: React.Dispatch<React.SetStateAction<any[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  return (
    <AppContext.Provider value={{ isDark, toggleDarkMode, movies, setMovies }}>
      <div className={isDark ? "dark" : ""}>{children}</div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};