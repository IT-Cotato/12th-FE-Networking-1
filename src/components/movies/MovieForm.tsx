import styled from "styled-components";
import { useMovieForm } from "../../hooks/useMovieForm";

const Box = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.componentBg};
  border: 1px solid ${({ theme }) => theme.border};
`;
const H2 = styled.h2`
  margin: 0 0 12px;
`;
const Form = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
const Input = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;
const Small = styled.input`
  width: 80px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;
const Select = styled.select`
  width: 100px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

type Props = {
  onAdd: (d: {
    title: string;
    director: string;
    year: number;
    genre: string;
    rating: number;
  }) => void;
};

export default function MovieForm({ onAdd }: Props) {
  const { form, error, change, submit, canSubmit } = useMovieForm(onAdd);

  return (
    <Box>
      <H2>영화 추가</H2>
      <Form onSubmit={submit} noValidate>
        <Input
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={change}
        />
        <Input
          name="director"
          placeholder="감독"
          value={form.director}
          onChange={change}
        />
        <Small
          name="year"
          placeholder="연도"
          value={form.year}
          onChange={change}
          type="number"
          inputMode="numeric"
          min={1800}
          step={1}
        />
        <Input
          name="genre"
          placeholder="장르"
          value={form.genre}
          onChange={change}
        />
        <Select
          name="rating"
          value={form.rating}
          onChange={change}
          aria-label="평점"
        >
          <option value="" disabled>
            평점
          </option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>

        <Button type="submit" disabled={!canSubmit}>
          추가
        </Button>
      </Form>
      {error && (
        <div
          style={
            {
              marginTop: 12,
              padding: 12,
              borderRadius: 8,
              background: (t: any) => t.errorBg,
              color: (t: any) => t.errorText,
            } as any
          }
        >
          {error}
        </div>
      )}
    </Box>
  );
}
