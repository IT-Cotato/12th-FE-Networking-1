import React, { useState, useEffect, useMemo, useContext } from "react";
import { themes } from "./styles/theme";
import Header from "./components/Header";
import ThemeButton from "./components/ThemeButton";
import { useTheme } from "./hooks/useTheme";
import InputField from "./components/InputField";
import { useFetch } from "./hooks/useFetch";
import { getMovies, postMovie } from "./apis/movieApi";
import type { Movie, NewMovie, NewMovieInputType } from "./types/movie";
import { useMutation } from "./hooks/useMutation";
import ErrorMessage from "./components/ErrorMessage";
import AddMovieForm from "./components/AddMovieForm";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovieValues, setNewMovieValues] = useState<NewMovieInputType>({
    title: "",
    director: "",
    year: "",
    genre: "",
    rating: "",
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const { currentTheme } = useTheme();
  const fetchedMovies = useFetch(getMovies, [refreshTrigger]);
  const addingMovie = useMutation(postMovie);

  const filteredMovies = useMemo(() => {
    if (!fetchedMovies.data?.length) {
      return [];
    }
    return fetchedMovies.data.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [fetchedMovies, searchTerm]);

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovieValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newMovieValues.title ||
      !newMovieValues.director ||
      !newMovieValues.year ||
      !newMovieValues.genre ||
      !newMovieValues.rating
    ) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    const newMovie: NewMovie = {
      title: newMovieValues.title,
      director: newMovieValues.director,
      year: Number(newMovieValues.year),
      genre: newMovieValues.genre,
      rating: Number(newMovieValues.rating),
    };

    const addedMovie = await addingMovie.mutate(newMovie);

    if (addedMovie) {
      setMovies((prev) => [...prev, addedMovie]);
      setRefreshTrigger((prev) => prev + 1);
      setNewMovieValues({
        title: "",
        director: "",
        year: "",
        genre: "",
        rating: "",
      });
    }
  };

  const errorMessage = fetchedMovies.error || error || addingMovie.error;

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
      <Header flexRowJustifyContent="end" title="코테이토 영화관">
        <ThemeButton />
      </Header>

      {errorMessage && <ErrorMessage message={errorMessage} />}

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
        <AddMovieForm
          inputValues={newMovieValues}
          onChange={handleChangeValues}
          onSubmit={handleAddMovie}
        />
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
        <InputField
          inputType="text"
          placeholder="검색..."
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "16px", width: "100%" }}
        />
        {fetchedMovies.isLoading ? (
          <div>로딩 중...</div>
        ) : filteredMovies.length === 0 ? (
          <div>영화가 없습니다</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
