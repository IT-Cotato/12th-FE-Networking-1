import { useState } from 'react';

export const useMovieForm = () => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDirector, setNewDirector] = useState<string>("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newRating, setNewRating] = useState<number | "">("");

  const resetForm = () => {
    setNewTitle("");
    setNewDirector("");
    setNewYear("");
    setNewGenre("");
    setNewRating("");
  };

  const validateForm = () => {
    return newTitle && newDirector && newYear && newGenre && newRating;
  };

  const getFormData = () => ({
    title: newTitle,
    director: newDirector,
    year: Number(newYear),
    genre: newGenre,
    rating: Number(newRating),
  });

  return {
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
    resetForm,
    validateForm,
    getFormData
  };
};