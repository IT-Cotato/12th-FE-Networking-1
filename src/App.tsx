import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import Header from "./components/Header";
import ErrorBox from "./components/ErrorBox";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light"); // 다크모드 상태 관리
  const [movies, setMovies] = useState<Movie[]>([]); // 전체 영화 목록 상태
  const [newTitle, setNewTitle] = useState<string>(""); // 아래 5개는 새 영화 추가에 대한 상태
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState<string>(""); // 영화 검색 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩

  const currentTheme = themes[themeName];

  // 영화 목록을 불러오는 hook
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

  // 검색 시 필터링 해주는 hook
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  // 영화 추가버튼 클릭시 작동하는 핸들러
  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    // 새 영화 추가 시 불러오는 형식
    const newMovie = {
      title: newTitle,
      director: newDirector,
      year: Number(newYear),
      genre: newGenre,
      rating: Number(newRating),
    };

    // 영화 추가에 대한 정보 전송 시 작동하는 hook
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
    // 전체를 div 태그로 감싸서 스타일링
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.2s ease",
      }}
    >
      {/* 상단 제목과 다크모드를 담당하는 헤더 스타일링 */}
      <Header
        themeName={themeName}
        toggleTheme={() =>
          setThemeName((prev) => (prev === "light" ? "dark" : "light"))
        }
        currentTheme={currentTheme}
      />
      <ErrorBox error={error} currentTheme={currentTheme} />
      {/* 영화 페이지 두번째 목록을 담당하는 부분 */}
      <MovieForm
        newTitle={newTitle}
        newDirector={newDirector}
        newYear={newYear}
        newGenre={newGenre}
        newRating={newRating}
        setNewTitle={setNewTitle}
        setNewDirector={setNewDirector}
        setNewYear={setNewYear}
        setNewGenre={setNewGenre}
        setNewRating={setNewRating}
        onSubmit={handleAddMovie}
        currentTheme={currentTheme}
      />
      <MovieList
        movies={filteredMovies}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={isLoading}
        currentTheme={currentTheme}
      />
    </div>
  );
}

export default App;
