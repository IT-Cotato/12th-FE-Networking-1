import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovie } from "@/api";
import { type NewMovie } from "@/types/movie";
import Input from "./ui/input";
import Button from "./ui/button";
import StarRating from "./star-rating";

const INITIAL_STATE: NewMovie = {
  title: "",
  director: "",
  year: 2025,
  genre: "",
  rating: 0,
};

export default function MovieForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<NewMovie>(INITIAL_STATE);
  const [formError, setFormError] = useState<string | null>(null);
  const [shake, setShake] = useState(false); // 🔥 애니메이션 제어용

  const { mutate, isPending, error } = useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      setFormData(INITIAL_STATE);
      setFormError(null);
      setShake(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isInvalid =
      !formData.title ||
      !formData.director ||
      !formData.genre ||
      formData.rating === 0;

    if (isInvalid) {
      setFormError("모든 필드를 입력해주세요.");
      setShake(false); // 먼저 껐다가
      requestAnimationFrame(() => setShake(true)); // 다음 프레임에서 다시 켜줌 → 매번 실행됨
      return;
    }

    setFormError(null);
    setShake(false);
    mutate(formData);
  };

  const containerClasses = `
    mb-6 p-5 rounded-xl bg-white dark:bg-deep-gray border transition-all
    ${
      formError
        ? `border-red-500 ${shake ? "animate-shake" : ""}`
        : "border-gray dark:border-dark-gray"
    }
  `;

  return (
    <div className={containerClasses}>
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

        <StarRating onChange={handleRatingChange} value={formData.rating} />

        <Button type="submit" disabled={isPending}>
          {isPending ? "추가 중..." : "추가"}
        </Button>
        {formError && <p className="text-red-600 text-sm">{formError}</p>}
      </form>
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
    </div>
  );
}
