import styled from "styled-components";
import type { Movie } from "../../types/movie";

const Card = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.hoverBg};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

type Props = {
  movie: Movie;
  onRemove?: (id: number) => void;
};

export default function MovieItem({ movie, onRemove }: Props) {
  return (
    <li style={{ listStyle: "none" }}>
      <Card>
        <span>
          {movie.title} ({movie.year}) - {movie.director}
        </span>
        <span>장르: {movie.genre}</span>
        <span>⭐: {movie.rating}</span>

        {onRemove && (
          <button
            onClick={() => onRemove(movie.id)}
            style={{
              marginTop: 6,
              alignSelf: "flex-end",
              padding: "4px 8px",
              fontSize: "0.8rem",
              border: "1px solid #ccc",
              borderRadius: 4,
              background: "transparent",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        )}
      </Card>
    </li>
  );
}
