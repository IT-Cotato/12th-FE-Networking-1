import { useState, useEffect, useMemo } from "react";
import { themes } from "./styles/theme";
import "./index.css";

import Input from "@/components/ui/input";
import Header from "@/components/header";
import MovieForm from "./components/movie-form";
import MovieList from "./components/movie-list";
interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

function App() {
  const currentTheme = themes["light"];

  return (
    <div
      className="bg-light-background dark:bg-dark-background 
      text-black dark:text-white min-h-screen p-5
      transition-all duration-200 ease-in-out 
      "
    >
      <Header />
      <MovieForm />
      <MovieList />
    </div>
  );
}

export default App;
