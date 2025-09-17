// src/components/movies/MovieForm.tsx
import React from "react";
import styled from "styled-components";

interface MovieFormProps {
  newTitle: string;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  newDirector: string;
  setNewDirector: React.Dispatch<React.SetStateAction<string>>;
  newYear: number | "";
  setNewYear: React.Dispatch<React.SetStateAction<number | "">>;
  newGenre: string;
  setNewGenre: React.Dispatch<React.SetStateAction<string>>;
  newRating: number | "";
  setNewRating: React.Dispatch<React.SetStateAction<number | "">>;
  handleAddMovie: (e: React.FormEvent) => void;
}

// 최상위 컨테이너
const FormContainer = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.componentBg};
  border: 1px solid ${({ theme }) => theme.border};
`;

// 폼 스타일
const Form = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

// 입력 필드 스타일
const Input = styled.input<{ width?: string }>`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  width: ${({ width }) => width || "auto"};
`;

// 버튼 스타일
const Button = styled.button`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const MovieForm: React.FC<MovieFormProps> = ({
  newTitle,
  setNewTitle,
  newDirector,
  setNewDirector,
  newYear,
  setNewYear,
  newGenre,
  setNewGenre,
  newRating,
  setNewRating,
  handleAddMovie,
}) => {
  return (
    <FormContainer>
      <h2>영화 추가</h2>
      <Form onSubmit={handleAddMovie}>
        <Input
          type="text"
          placeholder="제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="감독"
          value={newDirector}
          onChange={(e) => setNewDirector(e.target.value)}
        />
        <Input
          type="number"
          placeholder="연도"
          value={newYear}
          onChange={(e) => setNewYear(Number(e.target.value))}
          width="80px"
        />
        <Input
          type="text"
          placeholder="장르"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
        />
        <Input
          type="number"
          placeholder="평점"
          value={newRating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 10) setNewRating(val);
          }}
          width="100px"
        />
        <Button type="submit">추가</Button>
      </Form>
    </FormContainer>
  );
};

export default MovieForm;
