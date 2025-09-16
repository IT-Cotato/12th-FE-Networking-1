// import React, { useState } from "react";
// import type { Theme } from "../styles/theme";
// import type { NewMovie } from "../hooks/useMovies";

// type Props = {
//   theme: Theme;
//   onAdd: (payload: NewMovie) => Promise<void> | void;
// };

// export default function MovieForm({ theme, onAdd }: Props) {
//   const [title, setTitle] = useState("");
//   const [director, setDirector] = useState("");
//   const [year, setYear] = useState<number | "">("");
//   const [genre, setGenre] = useState("");
//   const [rating, setRating] = useState<number | "">("");
//   const [localError, setLocalError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !director || !year || !genre || rating === "") {
//       setLocalError("모든 필드를 입력해주세요.");
//       return;
//     }
//     const payload: NewMovie = {
//       title,
//       director,
//       year: Number(year),
//       genre,
//       rating: Number(rating),
//     };
//     try {
//       await onAdd(payload);
//       setTitle("");
//       setDirector("");
//       setYear("");
//       setGenre("");
//       setRating("");
//       setLocalError(null);
//     } catch (e) {
//       setLocalError(e instanceof Error ? e.message : "제출 중 오류");
//     }
//   };

//   return (
//     <section
//       style={{
//         marginBottom: 24,
//         padding: 20,
//         borderRadius: 12,
//         background: theme.componentBg,
//         border: `1px solid ${theme.border}`,
//       }}
//     >
//       <h2>영화 추가</h2>
//       <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//         <input
//           style={inputStyle(theme)}
//           placeholder="제목"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           style={inputStyle(theme)}
//           placeholder="감독"
//           value={director}
//           onChange={(e) => setDirector(e.target.value)}
//         />
//         <input
//           style={{ ...inputStyle(theme), width: 100 }}
//           type="number"
//           placeholder="연도"
//           value={year}
//           onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
//         />
//         <input
//           style={inputStyle(theme)}
//           placeholder="장르"
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
//         />
//         <input
//           style={{ ...inputStyle(theme), width: 120 }}
//           type="number"
//           placeholder="평점(0~10)"
//           value={rating}
//           onChange={(e) => {
//             const v = e.target.value === "" ? "" : Number(e.target.value);
//             if (v === "" || (typeof v === "number" && v >= 0 && v <= 10)) setRating(v);
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "8px 16px",
//             background: theme.buttonBg,
//             color: theme.buttonText,
//             border: "none",
//             borderRadius: 8,
//             cursor: "pointer",
//           }}
//         >
//           추가
//         </button>
//       </form>
//       {localError && (
//         <div
//           style={{
//             marginTop: 12,
//             padding: 10,
//             borderRadius: 8,
//             background: theme.errorBg,
//             color: theme.errorText,
//           }}
//         >
//           {localError}
//         </div>
//       )}
//     </section>
//   );
// }

// const inputStyle = (theme: Theme): React.CSSProperties => ({
//   padding: 8,
//   borderRadius: 8,
//   border: `1px solid ${theme.border}`,
//   background: theme.inputBg,
//   color: theme.text,
// });

import React, { useState } from "react";
import type { Theme } from "../styles/theme";
import type { NewMovie } from "../hooks/useMovies";

export type MovieFormProps = {
  theme: Theme;
  onAdd: (payload: NewMovie) => Promise<void> | void;
};

function MovieForm({ theme, onAdd }: MovieFormProps) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !director || !year || !genre || rating === "") {
      setLocalError("모든 필드를 입력해주세요.");
      return;
    }
    const payload: NewMovie = {
      title,
      director,
      year: Number(year),
      genre,
      rating: Number(rating),
    };
    try {
      await onAdd(payload);
      setTitle(""); setDirector(""); setYear(""); setGenre(""); setRating("");
      setLocalError(null);
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : "제출 중 오류");
    }
  };

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
        <input style={inputStyle} placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input style={inputStyle} placeholder="감독" value={director} onChange={(e) => setDirector(e.target.value)} />
        <input
          style={{ ...inputStyle, width: 100 }} type="number" placeholder="연도" value={year}
          onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
        />
        <input style={inputStyle} placeholder="장르" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <input
          style={{ ...inputStyle, width: 120 }} type="number" placeholder="평점(0~10)" value={rating}
          onChange={(e) => {
            const v = e.target.value === "" ? "" : Number(e.target.value);
            if (v === "" || (typeof v === "number" && v >= 0 && v <= 10)) setRating(v);
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
      {localError && (
        <div
          style={{
            marginTop: 12,
            padding: 10,
            borderRadius: 8,
            background: theme.errorBg,
            color: theme.errorText,
          }}
        >
          {localError}
        </div>
      )}
    </section>
  );
}

export default MovieForm;
