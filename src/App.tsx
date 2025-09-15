import React, { useState, useEffect, useMemo } from "react";
import { themes, type ThemeName } from "./styles/theme";
import Header from "./components/Header";

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
      {/* 영화 페이지 두번째 목록을 담당하는 부분 */}
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
          {/* 영화를 추가하는 기능을 담당하는 부분 */}
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
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: currentTheme.componentBg,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
        {/* 영화 추가한 부분에 대해서 목록으로 나타내는 부분*/}
        <h2>영화 목록</h2>
        <input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: `1px solid ${currentTheme.border}`,
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
            marginBottom: "16px",
            width: "100%",
          }}
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
