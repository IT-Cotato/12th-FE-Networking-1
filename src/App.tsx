import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import { Header } from "./components/Header";
import { ErrorMessage } from "./components/ErrorMessage";
import { MovieForm } from "./components/MovieForm";
import { MovieList } from "./components/MovieList";
import { type Movie } from "./types/Movie";
import { useMovies } from "./hooks/useMovies";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const currentTheme = themes[themeName];

  // useMovies 훅 호출
  const { movies, isLoading, error, searchTerm, setSearchTerm, addMovie, setError } = useMovies(); 

  // 폼 상태들
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");

  // 영화 추가하기
  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 폼 검증
    if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    // 2. 폼 데이터를 Movie 객체로 변환
    const newMovie = {
      title: newTitle,
      director: newDirector,
      year: Number(newYear),
      genre: newGenre,
      rating: Number(newRating),
    };

    // 3. useMovies 훅의 addMovie 함수 호출
    await addMovie(newMovie);

    // 4. 폼 초기화
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
      <Header 
        themeName={themeName} 
        onThemeToggle={() => setThemeName(themeName === "light" ? "dark" : "light")} 
        currentTheme={currentTheme} 
      />

      {/* ErrorMessage 호출 */}
      <ErrorMessage 
        error={error}
        currentTheme={currentTheme}
      />

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
        currentTheme={currentTheme}
      />

      {/* MovieList 호출 */}
      <MovieList
        movies={movies} // useMovies에서 이미 필터링된 movies를 받음 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
        currentTheme={currentTheme}
      />

    </div>
  );
}

export default App;
