import styled from "styled-components";
import { useMovieForm } from "../../hooks/useMovieForm";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 120px 120px auto;
  gap: 8px;
  margin: 16px 0;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #111827;
  color: #ffffff;
`;

type Props = {
  onAdd: (d: { title: string; year: number; rating?: number }) => void;
};

export default function MovieForm({ onAdd }: Props) {
  const { form, error, change, submit } = useMovieForm(onAdd);

  return (
    <>
      <Form onSubmit={submit}>
        <Input
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={change}
        />
        <Input
          name="year"
          placeholder="연도(예: 2025)"
          value={form.year}
          onChange={change}
        />
        <Input
          name="rating"
          placeholder="평점(0~10, 선택)"
          value={form.rating}
          onChange={change}
        />
        <Button type="submit">추가</Button>
      </Form>
      {error && <p style={{ color: "tomato", marginTop: -8 }}>{error}</p>}
    </>
  );
}
