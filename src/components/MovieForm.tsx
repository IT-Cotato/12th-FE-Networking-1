import React, { useState } from "react";
import { type Theme } from "../styles/theme";
import { useAddMovie } from "../hooks/useAddMovies";

interface MovieFormProps {
  currentTheme: Theme;
}

const MovieForm: React.FC<MovieFormProps> = ({ currentTheme }) => {
  const { addMovie } = useAddMovie();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !director || !year || !genre || !rating) return;
    await addMovie({
      title,
      director,
      year: Number(year),
      genre,
      rating: Number(rating),
    });
    // 성공 후 폼 리셋
    setTitle("");
    setDirector("");
    setYear("");
    setGenre("");
    setRating("");
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
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle(currentTheme)}
        />
        <input
          type="text"
          placeholder="감독"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          style={inputStyle(currentTheme)}
        />
        <input
          type="number"
          placeholder="연도"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{ ...inputStyle(currentTheme), width: "80px" }}
        />
        <input
          type="text"
          placeholder="장르"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={inputStyle(currentTheme)}
        />
        <input
          type="number"
          placeholder="평점"
          value={rating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 10) setRating(val);
          }}
          style={{ ...inputStyle(currentTheme), width: "100px" }}
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
};

const inputStyle = (theme: Theme): React.CSSProperties => ({
  padding: "8px",
  borderRadius: "8px",
  border: `1px solid ${theme.border}`,
  backgroundColor: theme.inputBg,
  color: theme.text,
});

export default MovieForm;
