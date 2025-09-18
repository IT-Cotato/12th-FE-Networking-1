import type { Movie } from "../../types/movie";
import MovieItem from "./MovieItem";

type Props = { movies: Movie[]; onRemove?: (id: string) => void };

export default function MovieList({ movies, onRemove }: Props) {
  if (!movies.length) return <p>표시할 영화가 없어요.</p>;
  return (
    <ul style={{ padding: 0, display: "grid", gap: 10 }}>
      {movies.map((m) => (
        <MovieItem key={m.id} movie={m} onRemove={onRemove} />
      ))}
    </ul>
  );
}
