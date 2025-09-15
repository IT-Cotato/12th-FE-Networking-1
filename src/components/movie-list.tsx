import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/api";
import Input from "./ui/input";
import MovieListItem from "./movie-list-item";

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
            <MovieListItem movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
