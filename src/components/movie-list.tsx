import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/api";
import Input from "./ui/input";
import MovieListItem from "./movie-list-item";
import { type Movie } from "@/types/movie";
import { decomposeHangul } from "@/utils/hangul";

export default function MovieList() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery<Movie[], Error>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const filteredMovies = useMemo(() => {
    if (!searchTerm) {
      return movies;
    }
    const processedSearchTerm = searchTerm.toLowerCase().replace(/\s/g, "");
    const lowerCaseSearchTerm = processedSearchTerm.toLowerCase();

    return movies.filter((movie) => {
      const processedTitle = movie.title.toLowerCase().replace(/\s/g, "");
      const lowerCaseTitle = processedTitle.toLowerCase();
      const decomposedTitle = decomposeHangul(lowerCaseTitle);
      const decomposedSearchTerm = decomposeHangul(lowerCaseSearchTerm);
      if (decomposedTitle.includes(decomposedSearchTerm)) {
        return true;
      }

      return false;
    });
  }, [movies, searchTerm]);

  return (
    <div className="p-5 rounded-xl bg-white dark:bg-deep-gray border border-gray dark:border-dark-gray">
      <h2 className="text-xl font-bold mb-4">영화 목록</h2>
      <Input
        type="text"
        placeholder="검색 (초성, 단어 모두 가능)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full"
      />
      {isLoading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div className="text-red-600">에러: {error.message}</div>
      ) : filteredMovies.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredMovies.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
