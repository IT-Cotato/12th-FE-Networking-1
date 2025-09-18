import React from "react";
import type { Movie } from "../types/movie";
import Button from "./common/Button";
import { useAppContext } from "../context/AppContext"; 

interface MovieListProps {
  movies: Movie[];
  searchTerm: string;
  onSearch: (value: string) => void;
  isLoading: boolean;
}

const MovieList: React.FC<MovieListProps> = ({movies, searchTerm, onSearch, isLoading }) => {
  const {isDark} = useAppContext();
  return (
    <div className="p-6 bg-lightBackground text-black dark:bg-darkBackground dark:text-white transition-all duration-200">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">영화 목록</h2>
      <input
        type="text"
        placeholder="영화 제목을 검색해보세요 🔍"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full mb-4 p-2 rounded border border-gray dark:border-darkGray bg-white dark:bg-darkGray text-black dark:text-white"
      />
      {isLoading ? (
        <div className="text-black dark:text-white">로딩 중...</div>
      ) : movies.length === 0 ? (
        <div className="text-black dark:text-white">영화가 없습니다</div>
      ) : (
        <div className="flex flex-col gap-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="p-4 rounded bg-lightGray dark:bg-darkGray flex flex-col gap-1"
            >
              <div className="flex justify-between items-center">

              <div className="flex flex-col basis-1/2">
              <span className="font-semibold text-black dark:text-white">
                {movie.title} ({movie.year}) - {movie.director}
              </span>
              <span className="text-black dark:text-white">장르: {movie.genre}</span>
              <span className="text-yellowPoint font-bold">⭐ {movie.rating}</span>
              </div>

              <Button className="basis-1/4">
               삭제
              </Button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;