import { useMemo } from "react";
import { getMovies } from "../apis/movieApi";
import { useFetch } from "../hooks/useFetch";
import { useSearchStore } from "../stores/searchStore";
import { useShallow } from "zustand/shallow";
import MovieCard from "./MovieCard";
import ErrorMessage from "./ErrorMessage";

const MovieCardList = () => {
  // todo : 영화 추가시 영화 리스트 업데이트 기능 구현
  // const fetchedMovies = useFetch(getMovies, [refreshTrigger]);
  const fetchedMovies = useFetch(getMovies);

  const { searchTerm } = useSearchStore(
    useShallow((state) => ({
      searchTerm: state.searchTerm,
    }))
  );

  const filteredMovies = useMemo(() => {
    if (!fetchedMovies.data?.length) {
      return [];
    }
    return fetchedMovies.data.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [fetchedMovies, searchTerm]);

  if (fetchedMovies.isLoading) {
    return <div>로딩 중...</div>;
  }

  if (fetchedMovies.error) {
    return <ErrorMessage message={fetchedMovies.error} />;
  }

  if (filteredMovies.length === 0) {
    return <div>영화가 없습니다</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieCardList;
