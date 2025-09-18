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
const DeleteBtn = styled.button`
  margin-top: 6px;
  align-self: flex-end;
  padding: 4px 8px;
  font-size: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.componentBg};
  color: ${({ theme }) => theme.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.hoverBg};
  }
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
          <DeleteBtn onClick={() => onRemove(movie.id)}>삭제</DeleteBtn>
        )}
      </Card>
    </li>
  );
}
