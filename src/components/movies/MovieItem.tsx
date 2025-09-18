import type { Movie } from "../../types/movie";

type Props = { movie: Movie; onRemove?: (id: string) => void };

export default function MovieItem({ movie, onRemove }: Props) {
  return (
    <li
      style={{
        listStyle: "none",
        padding: "10px 12px",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <strong>{movie.title}</strong>
        <span style={{ opacity: 0.7, marginLeft: 8 }}>
          • {movie.year}
          {movie.rating != null ? ` • ⭐ ${movie.rating}` : ""}
        </span>
      </div>
      {onRemove && (
        <button
          onClick={() => onRemove(movie.id)}
          style={{ padding: "6px 10px" }}
        >
          삭제
        </button>
      )}
    </li>
  );
}
