import { useState } from "react";

export function useMovieForm() {
  const [newTitle, setNewTitle] = useState("");
  const [newDirector, setNewDirector] = useState("");
  const [newYear, setNewYear] = useState<number | "">("");
  const [newGenre, setNewGenre] = useState("");
  const [newRating, setNewRating] = useState<number | "">("");

  const resetForm = () => {
    setNewTitle("");
    setNewDirector("");
    setNewYear("");
    setNewGenre("");
    setNewRating("");
  };

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
  };
}
