import MovieList from "./components/movies/MovieList";
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const { movies } = useMovies();

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: "12px 0 16px" }}>🎬 Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}
