import React from "react";
import type { Theme } from "../styles/theme";
import type { NewMovie } from "../hooks/useMovies";
import { useMovieForm } from "../hooks/useMovieForm";

type Props = {
  theme: Theme;
  onAdd: (payload: NewMovie) => Promise<void> | void;
};

const MIN_YEAR = 1800;
const MAX_YEAR = 2100;

export default function MovieForm({ theme, onAdd }: Props) {
  //커스텀 훅 사용: 폼 상태/검증/제출 핸들러를 훅이 관리
  const { fields, setters, error, setError, handleSubmit } = useMovieForm(onAdd);

  const inputStyle: React.CSSProperties = {
    padding: 8,
    borderRadius: 8,
    border: `1px solid ${theme.border}`,
    background: theme.inputBg,
    color: theme.text,
  };

  return (
    <section
      style={{
        marginBottom: 24,
        padding: 20,
        borderRadius: 12,
        background: theme.componentBg,
        border: `1px solid ${theme.border}`,
      }}
    >
      <h2>영화 추가</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          style={inputStyle}
          placeholder="제목"
          value={fields.title}
          onChange={(e) => { setError(null); setters.setTitle(e.target.value); }}
        />

        <input
          style={inputStyle}
          placeholder="감독"
          value={fields.director}
          onChange={(e) => { setError(null); setters.setDirector(e.target.value); }}
        />

        {/* 연도: 1900~2025만 허용 (입력 가드 + min/max) */}
        <input
          style={{ ...inputStyle, width: 120 }}
          type="number"
          placeholder='연도'
          value={fields.year}
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={1}
          onChange={(e) => {
            const s = e.target.value;
            if (s === "") { setters.setYear(""); return; }   // 비우기 허용
            if (s.startsWith("-")) return;                   // 음수 차단
            const n = Number(s);
            if (Number.isNaN(n)) return;
            if (s.length < 4) { setters.setYear(n); return; } // 중간 타이핑 허용
            if (n >= MIN_YEAR && n <= MAX_YEAR) setters.setYear(n);
          }}
        />

        <input
          style={inputStyle}
          placeholder="장르"
          value={fields.genre}
          onChange={(e) => { setError(null); setters.setGenre(e.target.value); }}
        />

        <input
          style={{ ...inputStyle, width: 120 }}
          type="number"
          placeholder="평점(0~10)"
          value={fields.rating}
          onChange={(e) => {
            setError(null);
            const v = e.target.value === "" ? "" : Number(e.target.value);
            if (v === "" || (typeof v === "number" && v >= 0 && v <= 10)) {
              setters.setRating(v);
            }
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: theme.buttonBg,
            color: theme.buttonText,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          추가
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: 12,
            padding: 10,
            borderRadius: 8,
            background: theme.errorBg,
            color: theme.errorText,
          }}
        >
          {error}
        </div>
      )}
    </section>
  );
}
