import { useEffect, useState } from 'react';

import type { Movie } from '@/types/movie';
import type { ThemeName } from '@/types/theme';

import InputField from '@/components/InputField';
import ThemeButton from '@/components/ThemeButton';
import TitleSection from '@/components/TitleSection';

import { useAddMovie } from '@/hooks/useAddMovie';
import { useFilteredMovies } from '@/hooks/useFilteredMovies';

import { themes } from '@/styles/theme';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [themeName, setThemeName] = useState<ThemeName>('light'); // 추가
  const { searchTerm, setSearchTerm, filteredMovies } = useFilteredMovies(movies);
  const {
    newTitle,
    setNewTitle,
    newDirector,
    setNewDirector,
    newYear,
    setNewYear,
    newGenre,
    setNewGenre,
    newRating,
    setNewRating,
    error: addError,
    isLoading: isAdding,
    handleAddMovie,
  } = useAddMovie((movie) => setMovies((prev) => [...prev, movie]));
  const currentTheme = themes[themeName];

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/movies');
        if (!res.ok) throw new Error('영화 데이터를 불러오지 못했습니다.');
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

  return (
    <div
      className="font-display min-h-screen p-5 transition-all duration-200 ease-linear"
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
      }}
    >
      <header
        className="mb-6 flex items-center justify-between rounded-xl border border-solid p-4"
        style={{
          backgroundColor: currentTheme.componentBg,
          border: currentTheme.border,
        }}
      >
        <TitleSection size="h1" text="코테이토 영화관" />
        <ThemeButton themeName={themeName} onThemeChange={setThemeName} />
      </header>

      {addError && (
        <div
          className={`mb-5 rounded-lg p-3 ${themeName === 'light' ? 'bg-lightRed text-red' : 'bg-deepGray text-pink'}`}
        >
          {addError}
        </div>
      )}

      <div
        className="mb-6 rounded-xl border border-solid p-5"
        style={{
          backgroundColor: currentTheme.componentBg,
          border: currentTheme.border,
        }}
      >
        <TitleSection size="h2" text="영화 추가" />
        <form onSubmit={handleAddMovie} className="flex flex-wrap gap-3 py-2">
          <InputField
            themeName={themeName}
            type="text"
            placeholder="제목"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <InputField
            themeName={themeName}
            type="text"
            placeholder="감독"
            value={newDirector}
            onChange={(e) => setNewDirector(e.target.value)}
          />
          <InputField
            themeName={themeName}
            type="number"
            placeholder="연도"
            value={newYear}
            onChange={(e) => setNewYear(Number(e.target.value))}
            className="w-20"
          />
          <InputField
            themeName={themeName}
            type="text"
            placeholder="장르"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
          />
          <InputField
            themeName={themeName}
            type="number"
            placeholder="평점"
            value={newRating}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 0 && val <= 10) setNewRating(val);
            }}
            className="w-25"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-lg border-none px-4 py-2"
            style={{
              backgroundColor: currentTheme.buttonBg,
              color: currentTheme.buttonText,
            }}
          >
            추가
          </button>
        </form>
      </div>

      <div
        className="rounded-xl border border-solid p-5"
        style={{
          backgroundColor: currentTheme.componentBg,
          border: currentTheme.border,
        }}
      >
        <TitleSection size="h2" text="영화 목록" />
        <InputField
          themeName={themeName}
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-2 w-full"
        />

        {isLoading ? (
          <div>로딩 중...</div>
        ) : filteredMovies.length === 0 ? (
          <div>영화가 없습니다</div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className={`flex flex-col gap-1 rounded-lg p-3 ${themeName === 'light' ? 'bg-lightGray' : 'bg-darkGray'}`}
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
