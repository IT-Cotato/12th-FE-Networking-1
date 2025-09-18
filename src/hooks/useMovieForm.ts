import { useState } from "react";

interface FormState {
  title: string;
  year: string;
  rating: string;
}

// 상위 컴포넌트에게 전달할 실제 데이터
export interface MovieFormData {
  title: string;
  year: number;
  rating?: number;
}

export function useMovieForm(onSubmit: (data: MovieFormData) => void) {
  const [form, setForm] = useState<FormState>({
    title: "",
    year: "",
    rating: "",
  });

  const [error, setError] = useState<string | null>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 더 직관적인 개별 핸들러도 제공 (원하면 사용)
  const onTitleChange = (v: string) => setForm((p) => ({ ...p, title: v }));
  const onYearChange = (v: string) => setForm((p) => ({ ...p, year: v }));
  const onRatingChange = (v: string) => setForm((p) => ({ ...p, rating: v }));

  const validate = (): string | null => {
    const title = form.title.trim();
    if (!title) return "제목을 입력해주세요.";

    const yearNum = Number(form.year);
    if (!Number.isInteger(yearNum) || yearNum < 1800) {
      return "연도를 올바르게 입력해주세요. (1800 이상 정수)";
    }

    if (form.rating.trim() !== "") {
      const ratingNum = Number(form.rating);
      if (Number.isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
        return "평점은 0~10 사이의 숫자여야 합니다.";
      }
    }
    return null;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    // 상위로 넘길 실제 데이터
    const title = form.title.trim();
    const year = Number(form.year);
    const rating = form.rating.trim() === "" ? undefined : Number(form.rating);

    onSubmit({ title, year, rating });

    // 초기화
    setForm({ title: "", year: "", rating: "" });
    setError(null);
  };

  return {
    form,
    error,
    change,
    submit,
  };
}
