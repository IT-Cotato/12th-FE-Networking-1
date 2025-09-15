import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovie } from "@/api";
import { type NewMovie } from "@/types/movie";
import Input from "./ui/input";
import Button from "./ui/button";

const INITIAL_STATE: NewMovie = {
  title: "",
  director: "",
  year: 2024,
  genre: "",
  rating: 5,
};

export default function MovieForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<NewMovie>(INITIAL_STATE);

  const { mutate, isPending, error } = useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      setFormData(INITIAL_STATE);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => val === "")) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    mutate(formData);
  };

  return (
    <div className="mb-6 p-5 rounded-xl bg-white dark:bg-deep-gray border border-gray dark:border-dark-gray">
      <h2 className="text-xl font-bold mb-4">영화 추가</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-3"
      >
        <Input
          name="title"
          type="text"
          placeholder="제목"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          name="director"
          type="text"
          placeholder="감독"
          value={formData.director}
          onChange={handleChange}
        />
        <Input
          name="year"
          type="number"
          placeholder="연도"
          className="w-24"
          value={formData.year}
          onChange={handleChange}
        />
        <Input
          name="genre"
          type="text"
          placeholder="장르"
          value={formData.genre}
          onChange={handleChange}
        />
        <Input
          name="rating"
          type="number"
          placeholder="평점"
          className="w-28"
          min="0"
          max="10"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "추가 중..." : "추가"}
        </Button>
      </form>
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
}
