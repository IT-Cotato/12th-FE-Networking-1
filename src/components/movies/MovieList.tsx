import type { Movie } from "../../types/movie";
import MovieItem from "./MovieItem";

type Props = {
  movies: Movie[];
  onRemove?: (id: number) => void;
};

export default function MovieList({ movies, onRemove }: Props) {
  if (!movies.length) return <p>영화가 없습니다</p>;
  return (
    <ul style={{ padding: 0, display: "grid", gap: 10 }}>
      {movies.map((m) => (
        <MovieItem key={m.id} movie={m} onRemove={onRemove} />
      ))}
    </ul>
  );
}
