import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import "./index.css";

import Button from "./components/ui/button";

import Input from "./components/ui/input";
import Header from "./components/header";
interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentTheme = themes["light"];

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("영화 데이터를 불러오지 못했습니다.");
        const data: Movie[] = await res.json();
        setMovies(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [movies, searchTerm]);

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

    try {
      setIsLoading(true);
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");

      const savedMovie: Movie = await res.json();
      setMovies((prev) => [...prev, savedMovie]);
      setNewTitle("");
      setNewDirector("");
      setNewYear("");
      setNewGenre("");
      setNewRating("");
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setIsLoading(false);
    }
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
      <div
        style={{
          marginBottom: "24px",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: currentTheme.componentBg,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        <h2>영화 추가</h2>
        <form
          onSubmit={handleAddMovie}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
        >
          <Input
            type="text"
            placeholder="제목"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="감독"
            value={newDirector}
            onChange={(e) => setNewDirector(e.target.value)}
          />
          <Input
            type="number"
            placeholder="연도"
            value={newYear}
            onChange={(e) => setNewYear(Number(e.target.value))}
            className="w-20"
          />
          <Input
            type="text"
            placeholder="장르"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
          />
          <Input
            type="number"
            placeholder="평점"
            value={newRating}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 0 && val <= 10) setNewRating(val);
            }}
            className="w-[100px]"
          />
          <Button type="submit">추가</Button>
        </form>
      </div>
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: currentTheme.componentBg,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        <h2>영화 목록</h2>
        <Input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full"
        />
        {isLoading ? (
          <div>로딩 중...</div>
        ) : filteredMovies.length === 0 ? (
          <div>영화가 없습니다</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: currentTheme.hoverBg,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span>
                  {movie.title} ({movie.year}) - {movie.director}
                </span>
                <span>장르: {movie.genre}</span>
                <span>⭐: {movie.rating}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
