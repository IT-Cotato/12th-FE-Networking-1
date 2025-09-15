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
  const [error, setError] = useState<string | null>(null);
  const currentTheme = themes["light"];

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.2s ease",
      }}
    >
      <Header />
      {error && (
        <div
          style={{
            backgroundColor: currentTheme.errorBg,
            color: currentTheme.errorText,
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}
      <MovieForm />
      <MovieList />
    </div>
  );
}

export default App;
