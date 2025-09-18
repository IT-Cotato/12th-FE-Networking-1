import type React from "react";
import { useTheme } from "../hooks/useTheme";
import type { NewMovie, NewMovieInputType } from "../types/movie";
import InputField from "./InputField";
import { useState } from "react";
import { useMutation } from "../hooks/useMutation";
import { postMovie } from "../apis/movieApi";
import ErrorMessage from "./ErrorMessage";
import { useRefreshStore } from "../stores/refreshStore";
import { useShallow } from "zustand/shallow";

const AddMovieForm = () => {
  const { currentTheme } = useTheme();
  const addingMovie = useMutation(postMovie);
  const [error, setError] = useState<string | null>(null);
  const [inputValues, setinputValues] = useState<NewMovieInputType>({
    title: "",
    director: "",
    year: "",
    genre: "",
    rating: "",
  });
  const errorMessage = error || addingMovie.error;

  const { updateMovieList } = useRefreshStore(
    useShallow((state) => ({
      updateMovieList: state.updateMovieList,
    }))
  );

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !inputValues.title ||
      !inputValues.director ||
      !inputValues.year ||
      !inputValues.genre ||
      !inputValues.rating
    ) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    const newMovie: NewMovie = {
      title: inputValues.title,
      director: inputValues.director,
      year: Number(inputValues.year),
      genre: inputValues.genre,
      rating: Number(inputValues.rating),
    };

    const addedMovie = await addingMovie.mutate(newMovie);

    if (addedMovie) {
      updateMovieList();
      setinputValues({
        title: "",
        director: "",
        year: "",
        genre: "",
        rating: "",
      });
      setError(null);
    }
  };

  return (
    <>
      <form
        onSubmit={handleAddMovie}
        style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
      >
        <InputField
          inputType="text"
          placeholder="제목"
          name="title"
          value={inputValues.title}
          onChange={handleChangeValues}
        />
        <InputField
          inputType="text"
          placeholder="감독"
          name="director"
          value={inputValues.director}
          onChange={handleChangeValues}
        />
        <InputField
          inputType="number"
          placeholder="연도"
          name="year"
          value={inputValues.year}
          onChange={handleChangeValues}
          style={{ width: "80px" }}
        />
        <InputField
          inputType="text"
          placeholder="장르"
          name="genre"
          value={inputValues.genre}
          onChange={handleChangeValues}
        />
        <InputField
          inputType="number"
          placeholder="평점"
          name="rating"
          value={inputValues.rating}
          onChange={handleChangeValues}
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

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  );
};

export default AddMovieForm;
