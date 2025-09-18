import { useTheme } from "../hooks/useTheme";
import type { Movie } from "../types/movie";

interface MovieCard {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCard) => {
  const { currentTheme } = useTheme();

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: currentTheme.hoverBg,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <span>
        {movie.title} ({movie.year}) - {movie.director}
      </span>
      <span>장르: {movie.genre}</span>
      <span>⭐: {movie.rating}</span>
    </div>
  );
};

export default MovieCard;
