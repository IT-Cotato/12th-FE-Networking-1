import type { Movie } from "@/types/movie";

export default function MovieListItem({ movie }: { movie: Movie }) {
  return (
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
  );
}
