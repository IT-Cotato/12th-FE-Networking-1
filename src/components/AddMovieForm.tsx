import type React from "react";
import { useTheme } from "../hooks/useTheme";
import type { NewMovieInputType } from "../types/movie";
import InputField from "./InputField";
import type { FormEvent } from "react";

interface AddMovieFormProps {
  inputValues: NewMovieInputType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

const AddMovieForm = ({
  inputValues,
  onChange,
  onSubmit,
}: AddMovieFormProps) => {
  const { currentTheme } = useTheme();

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
    >
      <InputField
        inputType="text"
        placeholder="제목"
        name="title"
        value={inputValues.title}
        onChange={onChange}
      />
      <InputField
        inputType="text"
        placeholder="감독"
        name="director"
        value={inputValues.director}
        onChange={onChange}
      />
      <InputField
        inputType="number"
        placeholder="연도"
        name="year"
        value={inputValues.year}
        onChange={onChange}
        style={{ width: "80px" }}
      />
      <InputField
        inputType="text"
        placeholder="장르"
        name="genre"
        value={inputValues.genre}
        onChange={onChange}
      />
      <InputField
        inputType="number"
        placeholder="평점"
        name="rating"
        value={inputValues.rating}
        onChange={onChange}
        style={{ width: "100px" }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: currentTheme.buttonBg,
          color: currentTheme.buttonText,
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        추가
      </button>
    </form>
  );
};

export default AddMovieForm;
