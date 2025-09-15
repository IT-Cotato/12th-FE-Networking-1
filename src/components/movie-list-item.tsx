import { type Movie } from "@/types/movie";
import { memo } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import HighlightedText from "./ui/highlighted-text";
const renderStars = (rating: number) => {
  const stars = [];

  const ratingInFive = rating / 2;

  for (let i = 1; i <= 5; i++) {
    if (ratingInFive >= i) {
      stars.push(<FaStar key={`full-${i}`} />);
    } else if (ratingInFive >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={`half-${i}`} />);
    } else {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
  }
  return stars;
};

interface MovieListItemProps {
  movie: Movie;
  searchTerm: string;
}

function MovieListItem({ movie, searchTerm }: MovieListItemProps) {
  return (
    <div className="p-3 rounded-lg bg-light-gray dark:bg-dark-gray flex flex-col gap-1">
      <span className="font-bold">
        <HighlightedText text={movie.title} highlight={searchTerm} />(
        {movie.year}) - {movie.director}
      </span>
      <span>장르: {movie.genre}</span>
      <div className="flex items-center gap-1 text-yellow-400">
        {renderStars(movie.rating)}
        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
          ({movie.rating})
        </span>
      </div>
    </div>
  );
}

export default memo(MovieListItem);
