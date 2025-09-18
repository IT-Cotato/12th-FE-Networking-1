import { useState } from "react";

interface FormState {
  title: string;
  director: string;
  year: string;
  genre: string;
  rating: string;
}

// 상위 컴포넌트에게 전달할 실제 데이터
export interface MovieFormData {
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

export function useMovieForm(onSubmit: (d: MovieFormData) => void) {
  const [form, setForm] = useState<FormState>({
    title: "",
    director: "",
    year: "",
    genre: "",
    rating: "",
  });

  const [error, setError] = useState<string | null>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): string | null => {
    if (!form.title.trim()) return "제목을 입력해주세요.";
    if (!form.director.trim()) return "감독을 입력해주세요.";
    if (!form.genre.trim()) return "장르를 입력해주세요.";
    const y = Number(form.year);
    if (!Number.isInteger(y) || y < 1888)
      return "연도를 올바르게 입력해주세요. (1888 이상 정수)";
    const r = Number(form.rating);
    if (Number.isNaN(r) || r < 0 || r > 10)
      return "평점은 0~10 사이 숫자입니다.";
    return null;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);
    onSubmit({
      title: form.title.trim(),
      director: form.director.trim(),
      year: Number(form.year),
      genre: form.genre.trim(),
      rating: Number(form.rating),
    });
    setForm({ title: "", director: "", year: "", genre: "", rating: "" });
    setError(null);
  };

  const canSubmit =
    form.title.trim() &&
    form.director.trim() &&
    form.genre.trim() &&
    Number.isInteger(Number(form.year)) &&
    !Number.isNaN(Number(form.rating));

  return { form, error, change, submit, canSubmit: Boolean(canSubmit) };
}
