import React from "react";
import type { Movie } from "../../types/Movie";
import { type ThemeName, themes } from "../../styles/theme";
import { useMovieForm } from "../../hooks/useMovieForm";

interface MovieFormProps {
  themeName: ThemeName;
  onAddMovie: (movie: Omit<Movie, "id">) => void;
}
function MovieForm({ themeName, onAddMovie }: MovieFormProps) {
  const currentTheme = themes[themeName];
  const {
    formData: { newTitle, newDirector, newYear, newGenre, newRating },
    error,
    setNewTitle,
    setNewDirector,
    setNewYear,
    setNewGenre,
    setNewRating,
    validateForm,
    resetForm,
    createMovieData,
    setError,
  } = useMovieForm();

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newMovie = createMovieData();
      await onAddMovie(newMovie);
      resetForm();
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
      {error && (
        <div
          style={{
            backgroundColor: currentTheme.errorBg,
            color: currentTheme.errorText,
            padding: "8px",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          {error}
        </div>
      )}
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
