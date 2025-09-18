import React from "react";
import { themes, type ThemeName } from "../../styles/theme";
import type { Movie } from "../../types/Movie";
import SearchBar from "../SearchBar";
import { useMovieSearch } from "../../hooks/useMovieSearch";

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  themeName: ThemeName;
  onDeleteMovie: (movieId: number) => void;
}

function MovieList({ movies, isLoading, themeName, onDeleteMovie }: MovieListProps) {
  const currentTheme = themes[themeName];
  const { query, results, searchMovies } = useMovieSearch(movies);

  return (
    <div className={`p-5 rounded-xl border ${
      themeName === 'light' 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-gray-800 border-gray-700'
    }`}>
      <h2 className="text-xl font-semibold mb-4">영화 목록</h2>
      <SearchBar
        searchTerm={query}
        setSearchTerm={searchMovies}
        themeName={themeName}
      />

      {isLoading && <div className="text-center py-4">로딩 중...</div>}

      {!isLoading && results.length === 0 ? (
        <div className="text-center py-8 text-gray-500">등록된 영화가 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {results.map((movie) => (
            <div
              key={movie.id}
              className={`p-3 rounded-lg flex justify-between items-start gap-3 ${
                themeName === 'light' 
                  ? 'bg-gray-100 hover:bg-gray-200' 
                  : 'bg-gray-700 hover:bg-gray-600'
              } transition-colors`}
            >
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-medium">
                  {movie.title} ({movie.year}) - {movie.director}
                </span>
                <span className="text-sm opacity-80">장르: {movie.genre}</span>
                <span className="text-sm">⭐: {movie.rating}</span>
              </div>
              <button
                onClick={() => onDeleteMovie(movie.id)}
                className="px-2 py-1 bg-red-500 text-white border-none rounded cursor-pointer text-xs min-w-12 hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
