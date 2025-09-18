import React, { createContext, useContext, useState} from "react";
import type{ReactNode} from "react";
import type { Movie } from "../types/movie";

interface AppContextType {
  isDark: boolean;
  toggleDarkMode: () => void;

  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;

  newTitle: string;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;

  newDirector: string;
  setNewDirector: React.Dispatch<React.SetStateAction<string>>;

  newYear: number | "";
  setNewYear: React.Dispatch<React.SetStateAction<number | "">>;

  newGenre: string;
  setNewGenre: React.Dispatch<React.SetStateAction<string>>;

  newRating: number | "";
  setNewRating: React.Dispatch<React.SetStateAction<number | "">>;

  handleAddMovie: (e: React.FormEvent) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDirector, setNewDirector] = useState("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState("");
  const [newRating, setNewRating] = useState<number | "">("");

  const toggleDarkMode = () => setIsDark(!isDark);

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) return;

    const newMovie = {
      id: Date.now(), // 임시 id
      title: newTitle,
      director: newDirector,
      year: Number(newYear),
      genre: newGenre,
      rating: Number(newRating),
    };

    setMovies(prev => [...prev, newMovie]);

    setNewTitle("");
    setNewDirector("");
    setNewYear("");
    setNewGenre("");
    setNewRating("");
  };

  return (
    <AppContext.Provider value={{
      isDark,
      toggleDarkMode,
      movies,
      setMovies,
      newTitle,
      setNewTitle,
      newDirector,
      setNewDirector,
      newYear,
      setNewYear,
      newGenre,
      setNewGenre,
      newRating,
      setNewRating,
      handleAddMovie
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};