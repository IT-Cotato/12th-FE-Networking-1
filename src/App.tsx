import Header from "./components/common/Header";
import MovieList from "./components/movies/MovieList";
import SearchBar from "./components/movies/SearchBar";
import MovieForm from "./components/movies/MovieForm";
import { useMoviesApi } from "./hooks/useMovieApi";
import { useMovieSearch } from "./hooks/useMovieSearch";
import styled from "styled-components";

const Section = styled.div`
  padding: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.componentBg};
  border: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 24px;
`;
const H2 = styled.h2`
  margin: 0 0 12px;
`;

export default function App() {
  const { movies, addMovie, removeMovie, error, setError, isLoading } =
    useMoviesApi();
  const { query, setQuery, filtered } = useMovieSearch(movies);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <Header />

      <MovieForm onAdd={addMovie as any} />

      <Section>
        <H2>영화 목록</H2>
        <SearchBar value={query} onChange={setQuery} placeholder="검색..." />
        {error && (
          <div
            style={
              {
                background: (t: any) => t.errorBg,
                color: (t: any) => t.errorText,
                padding: 12,
                borderRadius: 8,
                marginTop: 12,
              } as any
            }
          >
            {error}
          </div>
        )}
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <MovieList movies={filtered} onRemove={removeMovie} />
        )}
      </Section>
    </div>
  );
}
