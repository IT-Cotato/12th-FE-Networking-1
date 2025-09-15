import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/api";
import Input from "./ui/input";

export default function MovieList() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [movies, searchTerm]);

  return (
    <div className="p-5 rounded-xl bg-white dark:bg-deep-gray border border-gray dark:border-dark-gray">
      <h2 className="text-xl font-bold mb-4">영화 목록</h2>
      <Input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full"
      />
      {isLoading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div className="text-red-600">에러: {error.message}</div>
      ) : filteredMovies.length === 0 ? (
        <div>영화가 없습니다</div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="p-3 rounded-lg bg-light-gray dark:bg-dark-gray flex flex-col gap-1"
            >
              <span className="font-bold">
                {movie.title} ({movie.year}) - {movie.director}
              </span>
              <span>장르: {movie.genre}</span>
              <span className="text-purple">⭐: {movie.rating}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
