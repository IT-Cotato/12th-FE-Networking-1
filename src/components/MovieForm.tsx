import React, { useState } from "react";
import styled from "styled-components";
import type { Theme } from "../styles/theme";
import type { Movie } from "../types/movie";

const FormContainer = styled.div<{ $theme: Theme }>`
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${props => props.$theme.componentBg};
  border: 1px solid ${props => props.$theme.border};
`;

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.01em;
`;

const Form = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Input = styled.input<{ $theme: Theme; $width?: string }>`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${props => props.$theme.border};
  background-color: ${props => props.$theme.inputBg};
  color: ${props => props.$theme.text};
  font-size: 14px;
  width: ${props => props.$width || 'auto'};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$theme.buttonBg};
  }

  &::placeholder {
    color: ${props => props.$theme.text};
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button<{ $theme: Theme; $disabled: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.$theme.buttonBg};
  color: ${props => props.$theme.buttonText};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.01em;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

interface MovieFormProps {
  currentTheme: Theme;
  onAddMovie: (movie: Omit<Movie, "id">) => Promise<void>;
  isLoading: boolean;
}

export function MovieForm({ currentTheme, onAddMovie, isLoading }: MovieFormProps) {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) {
      return;
    }

    const newMovie = {
      title: newTitle,
      director: newDirector,
      year: Number(newYear),
      genre: newGenre,
      rating: Number(newRating),
    };

    await onAddMovie(newMovie);
    
    // 성공적으로 추가되면 폼 초기화
    setNewTitle("");
    setNewDirector("");
    setNewYear("");
    setNewGenre("");
    setNewRating("");
  };

  return (
    <FormContainer $theme={currentTheme}>
      <FormTitle>영화 추가</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목"
          value={newTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
          $theme={currentTheme}
        />
        <Input
          type="text"
          placeholder="감독"
          value={newDirector}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDirector(e.target.value)}
          $theme={currentTheme}
        />
        <Input
          type="number"
          placeholder="연도"
          value={newYear}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewYear(Number(e.target.value))}
          $theme={currentTheme}
          $width="80px"
        />
        <Input
          type="text"
          placeholder="장르"
          value={newGenre}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGenre(e.target.value)}
          $theme={currentTheme}
        />
        <Input
          type="number"
          placeholder="평점"
          value={newRating}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 10) setNewRating(val);
          }}
          $theme={currentTheme}
          $width="100px"
        />
        <SubmitButton
          type="submit"
          disabled={isLoading}
          $theme={currentTheme}
          $disabled={isLoading}
        >
          {isLoading ? "추가 중..." : "추가"}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}
