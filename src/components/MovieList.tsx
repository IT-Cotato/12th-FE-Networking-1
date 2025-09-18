import React from "react";
import Button from "./common/Button";
import { useAppContext } from "../context/AppContext"; 

const MovieList: React.FC = () => {
  const { movies, setMovies, isDark } = useAppContext();

  const handleDelete = (id: number) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  return (
    <div className="p-6 bg-lightBackground text-black dark:bg-darkBackground dark:text-white transition-all duration-200">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">영화 목록</h2>
      {movies.length === 0 ? (
        <div className="text-black dark:text-white">영화 리스트가 비어있어요! 새로 영화를 추가해보세요 🎞️</div>
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
                <Button
                  className="basis-1/4"
                  onClick={() => handleDelete(movie.id)}
                >
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