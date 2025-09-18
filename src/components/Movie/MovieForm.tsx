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
    <div className={`mb-6 p-5 rounded-xl border ${
      themeName === 'light' 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-gray-800 border-gray-700'
    }`}>
      <h2 className="text-xl font-semibold mb-4">영화 추가</h2>
      {error && (
        <div className={`p-2 rounded-lg mb-3 ${
          themeName === 'light' 
            ? 'bg-red-100 text-red-800' 
            : 'bg-red-900 text-red-200'
        }`}>
          {error}
        </div>
      )}
      <form
        onSubmit={handleAddMovie}
        className="flex gap-3 flex-wrap"
      >
        <input
          type="text"
          placeholder="제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={`p-2 rounded-lg border ${themeName === 'light' 
            ? 'bg-white border-gray-300 text-gray-800' 
            : 'bg-gray-700 border-gray-600 text-gray-200'
          }`}
        />
        <input
          type="text"
          placeholder="감독"
          value={newDirector}
          onChange={(e) => setNewDirector(e.target.value)}
          className={`p-2 rounded-lg border ${themeName === 'light' 
            ? 'bg-white border-gray-300 text-gray-800' 
            : 'bg-gray-700 border-gray-600 text-gray-200'
          }`}
        />
        <input
          type="number"
          placeholder="연도"
          value={newYear}
          onChange={(e) => setNewYear(Number(e.target.value))}
          className={`p-2 rounded-lg border w-20 ${themeName === 'light' 
            ? 'bg-white border-gray-300 text-gray-800' 
            : 'bg-gray-700 border-gray-600 text-gray-200'
          }`}
        />
        <input
          type="text"
          placeholder="장르"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          className={`p-2 rounded-lg border ${themeName === 'light' 
            ? 'bg-white border-gray-300 text-gray-800' 
            : 'bg-gray-700 border-gray-600 text-gray-200'
          }`}
        />
        <input
          type="number"
          placeholder="평점"
          value={newRating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 10) setNewRating(val);
          }}
          className={`p-2 rounded-lg border w-24 ${themeName === 'light' 
            ? 'bg-white border-gray-300 text-gray-800' 
            : 'bg-gray-700 border-gray-600 text-gray-200'
          }`}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg border-none cursor-pointer transition-colors ${themeName === 'light' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          추가
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
