import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import { Header } from "./components/Header";
import { ErrorMessage } from "./components/ErrorMessage";
import { MovieForm } from "./components/MovieForm";
import { MovieList } from "./components/MovieList";
import { type Movie } from "./types/Movie";
import { useMovieStore } from "./stores/movieStore";
import { useThemeStore } from "./stores/themeStore";

function App() {
  // useThemeStore 사용
  const { themeName, currentTheme, toggleTheme } = useThemeStore();

  // useMovieStore 사용
  const { 
    filteredMovies, 
    searchTerm, 
    setSearchTerm, 
    isLoading, 
    error, 
    setError, 
    addNewMovie,
    fetchMovies 
  } = useMovieStore();

  // 폼 상태들
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");

  // 1. 앱 시작 시 영화 목록 가져오기
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // 2. 영화 추가하기
  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    const newMovie = {
      title: newTitle,
      director: newDirector,
      year: Number(newYear),
      genre: newGenre,
      rating: Number(newRating),
    };

    await addNewMovie(newMovie);
    
    // 3. 폼 초기화
    setNewTitle("");
    setNewDirector("");
    setNewYear("");
    setNewGenre("");
    setNewRating("");
  };

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
      {/* Header 호출 */}
      <Header/>

      {/* ErrorMessage 호출 */}
      <ErrorMessage />

      {/* MovieForm 호출 */}
      <MovieForm
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newDirector={newDirector}
        setNewDirector={setNewDirector}
        newYear={newYear}
        setNewYear={setNewYear}
        newGenre={newGenre}
        setNewGenre={setNewGenre}
        newRating={newRating}
        setNewRating={setNewRating}
        onSubmit={handleAddMovie}
      />

      {/* MovieList 호출 */}
      <MovieList />

    </div>
  );
}

export default App;
