import React, { useState } from "react";
import type { ThemeName } from "../styles/theme";
import type { Movie } from "../types/movie";
import { themes } from "../styles/theme";

interface MovieFormProps {
  onAddMovie: (movie: Omit<Movie, "id">) => void;
  themeName?: ThemeName;
}

export default function MovieForm({
  onAddMovie,
  themeName = "light",
}: MovieFormProps) {
  const theme = themes[themeName];

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !director || !year || !genre || !rating) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    onAddMovie({
      title,
      director,
      year: Number(year),
      genre,
      rating: Number(rating),
    });

    setTitle("");
    setDirector("");
    setYear("");
    setGenre("");
    setRating("");
    setError(null);
  };

  return (
    <div
      style={{
        marginBottom: "24px",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: theme.componentBg,
        border: `1px solid ${theme.border}`,
      }}
    >
      <h2>영화 추가</h2>
      {error && (
        <div
          style={{
            backgroundColor: theme.errorBg,
            color: theme.errorText,
            padding: "8px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.inputBg,
            color: theme.text,
          }}
        />
        <input
          type="text"
          placeholder="감독"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.inputBg,
            color: theme.text,
          }}
        />
        <input
          type="number"
          placeholder="연도"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.inputBg,
            color: theme.text,
            width: "80px",
          }}
        />
        <input
          type="text"
          placeholder="장르"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.inputBg,
            color: theme.text,
          }}
        />
        <input
          type="number"
          placeholder="평점"
          value={rating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 10) setRating(val);
          }}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.inputBg,
            color: theme.text,
            width: "100px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: theme.buttonBg,
            color: theme.buttonText,
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
