// import React, { useMemo } from "react";
// import type { Theme } from "../styles/theme";
// import type { Movie } from "../hooks/useMovies";

// export type MovieListProps = {
//   theme: Theme;
//   movies: Movie[];
//   isLoading: boolean;
//   searchTerm: string;
// };

// function MovieList({ theme, movies, isLoading, searchTerm }: MovieListProps) {
//   const filtered = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     if (!q) return movies;
//     return movies.filter((m) => m.title.toLowerCase().includes(q));
//   }, [movies, searchTerm]);

//   return (
//     <section
//       style={{
//         padding: 20,
//         borderRadius: 12,
//         background: theme.componentBg,
//         border: `1px solid ${theme.border}`,
//       }}
//     >
//       <h2>영화 목록</h2>
//       {isLoading ? (
//         <div>로딩 중...</div>
//       ) : filtered.length === 0 ? (
//         <div>영화가 없습니다</div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//           {filtered.map((movie) => (
//             <div
//               key={movie.id}
//               style={{
//                 padding: 12,
//                 borderRadius: 8,
//                 background: theme.hoverBg,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 4,
//               }}
//             >
//               <span>
//                 {movie.title} ({movie.year}) - {movie.director}
//               </span>
//               <span>장르: {movie.genre}</span>
//               <span>⭐: {movie.rating}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default MovieList;

import React, { useMemo } from "react";
import styled from "styled-components";
import type { Theme } from "../styles/theme";
import type { Movie } from "../hooks/useMovies";

const isDark = (t: Theme) => t.background === "#1a1a1a";

type Props = {
  theme: Theme;
  movies: Movie[];
  isLoading: boolean;
  searchTerm: string;
};

export default function MovieList({ theme, movies, isLoading, searchTerm }: Props) {
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().includes(q));
  }, [movies, searchTerm]);

  return (
    <Section $theme={theme}>
      <H2>영화 목록</H2>

      {isLoading ? (
        <Grid>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </Grid>
      ) : filtered.length === 0 ? (
        <Empty>영화가 없습니다</Empty>
      ) : (
        <Grid>
  {filtered.map((m) => {
    // ✅ mocks 수정 없이: 제목 기반 placeholder 포스터
    const posterSrc =
      m.poster ?? `https://picsum.photos/seed/${encodeURIComponent(m.title)}/240/360`;

    return (
      <Ticket key={m.id} $theme={theme}>
        <Poster $theme={theme} aria-hidden>
          {/* ✅ 포스터 이미지 */}
          <PosterImg
            src={posterSrc}
            alt={`${m.title} 포스터`}
            loading="lazy"
            onError={(e) => {
              // 이미지 로드 실패 시 깔끔히 숨김 → 기존 그라디언트가 배경으로 보임
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          <Badge $theme={theme}>⭐ {m.rating}</Badge>
          <PosterTitle>{m.title}</PosterTitle>
        </Poster>

        <Body>
          <Title>{m.title}</Title>
          <Meta>
            {m.year} · {m.director}
          </Meta>

          <ChipRow>
            <Chip $theme={theme}>{m.genre}</Chip>
            <Status $theme={theme} $now={isNowShowing(m.year)}>
              {isNowShowing(m.year) ? "상영중" : "개봉 예정"}
            </Status>
          </ChipRow>

          <RatingRow>
            <small>평점</small>
            <Meter $theme={theme}>
              <Fill $value={m.rating} />
            </Meter>
          </RatingRow>
        </Body>
      </Ticket>
    );
  })}
</Grid>

      )}
    </Section>
  );
}

/* ---------- helpers ---------- */
function isNowShowing(year: number) {
  const thisYear = new Date().getFullYear();
  return year <= thisYear;
}

/* ---------- styled ---------- */
const Section = styled.section<{ $theme: Theme }>`
  padding: 20px;
  border-radius: 12px;
  background: ${({ $theme }) => $theme.componentBg};
  border: 1px solid ${({ $theme }) => $theme.border};
`;

const H2 = styled.h2`
  margin: 0 0 16px;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
`;

const Ticket = styled.article<{ $theme: Theme }>`
  position: relative;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  padding: 12px;
  border-radius: 16px;
  background: ${({ $theme }) => $theme.hoverBg};
  /* 티켓 모양 구멍 */
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    background: ${({ $theme }) => $theme.background};
    border: 1px solid ${({ $theme }) => $theme.border};
    border-radius: 50%;
    transform: translateY(-50%);
  }
  &::before {
    left: -8px;
  }
  &::after {
    right: -8px;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const PosterImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(.95);
`;


const Poster = styled.div<{ $theme: Theme }>`
  aspect-ratio: 2 / 3;
  border-radius: 10px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.07), rgba(0,0,0,0.25)),
    radial-gradient(120% 120% at 10% 0%, rgba(139,92,246,.35), transparent 50%),
    radial-gradient(120% 120% at 100% 90%, rgba(252,165,165,.35), transparent 50%);
  border: 1px solid ${({ $theme }) => $theme.border};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: end;
  padding: 10px;
`;

const PosterTitle = styled.div`
  position: relative;  
  z-index: 1;    
  font-weight: 700;
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Badge = styled.span<{ $theme: Theme }>`
  position: absolute;
  z-index: 2; 
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 999px;
  background: ${({ $theme }) => $theme.buttonBg};
  color: ${({ $theme }) => $theme.buttonText};
  font-weight: 700;
  font-size: 12px;
`;

const Body = styled.div`
  display: grid;
  gap: 6px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const Meta = styled.div`
  opacity: 0.8;
  font-size: 14px;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Chip = styled.span<{ $theme: Theme }>`
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  color: ${({ $theme }) => $theme.text};
  background: ${({ $theme }) =>
    isDark($theme) ? "rgba(255,255,255,0.08)" : $theme.inputBg};
  border: 1px solid ${({ $theme }) =>
    isDark($theme) ? "rgba(255,255,255,0.18)" : $theme.border};
`;

const Status = styled.span<{ $theme: Theme; $now: boolean }>`
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $now, $theme }) => ($now ? $theme.accent : $theme.inputBg)};
  color: ${({ $now, $theme }) => ($now ? $theme.buttonText : $theme.text)};
  border: 1px solid ${({ $theme }) => $theme.border};
`;

const RatingRow = styled.div`
  display: grid;
  gap: 6px;
  margin-top: 6px;
`;

const Meter = styled.div<{ $theme: Theme }>`
  height: 8px;
  border-radius: 999px;
  background: ${({ $theme }) =>
    isDark($theme) ? "rgba(255,255,255,0.08)" : $theme.inputBg};
  border: 1px solid ${({ $theme }) =>
    isDark($theme) ? "rgba(255,255,255,0.20)" : $theme.border};
  box-shadow: ${({ $theme }) =>
    isDark($theme) ? "inset 0 1px 0 rgba(255,255,255,0.06)" : "none"};
  overflow: hidden;
`;

const Fill = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => Math.min(100, Math.max(0, $value * 10))}%;
  background: linear-gradient(90deg, #8b5cf6, #fca5a5);
`;

const Empty = styled.div`
  opacity: 0.8;
`;

const Skeleton = styled.div`
  border-radius: 16px;
  height: 112px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.05) 25%,
    rgba(255,255,255,0.12) 37%,
    rgba(255,255,255,0.05) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
  @keyframes shimmer {
    0% { background-position: 100% 0 }
    100% { background-position: -100% 0 }
  }
`;

