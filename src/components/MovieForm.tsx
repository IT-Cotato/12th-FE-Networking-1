import React, { useState } from "react";
import type { Movie } from "../types/Movie";
import { type ThemeName, themes } from "../styles/theme";

interface MovieFormProps {
  themeName: ThemeName;
  onAddMovie: (movie: Omit<Movie, "id">) => void;
}
function MovieForm({ themeName, onAddMovie }: MovieFormProps) {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const currentTheme = themes[themeName];

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
      await onAddMovie(newMovie);
      // 입력창 초기화
      setNewTitle("");
      setNewDirector("");
      setNewYear("");
      setNewGenre("");
      setNewRating("");
      setError(null);
    } catch (err) {
      setError("영화 추가에 실패했습니다.");
    }
  };

  return (
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
        <input
          type="text"
          placeholder="제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${currentTheme.border}`,
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
          }}
        />
        <input
          type="text"
          placeholder="감독"
          value={newDirector}
          onChange={(e) => setNewDirector(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${currentTheme.border}`,
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
          }}
        />
        <input
          type="number"
          placeholder="연도"
          value={newYear}
          onChange={(e) => setNewYear(Number(e.target.value))}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${currentTheme.border}`,
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
            width: "80px",
          }}
        />
        <input
          type="text"
          placeholder="장르"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${currentTheme.border}`,
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
          }}
        />
        <input
          type="number"
          placeholder="평점"
          value={newRating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 10) setNewRating(val);
          }}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${currentTheme.border}`,
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
            width: "100px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: currentTheme.buttonBg,
            color: currentTheme.buttonText,
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          추가
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
