import MovieList from "./components/movies/MovieList";
import SearchBar from "./components/movies/SearchBar";
import MovieForm from "./components/movies/MovieForm";
import { useMovies } from "./hooks/useMovies";
import { useMovieSearch } from "./hooks/useMovieSearch";

export default function App() {
  const { movies, addMovie, removeMovie } = useMovies();
  const { query, setQuery, filtered } = useMovieSearch(movies);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: "12px 0 16px" }}>🎬 Movies</h1>

      <MovieForm onAdd={addMovie} />

      <SearchBar value={query} onChange={setQuery} />

      <MovieList movies={filtered} onRemove={removeMovie} />
    </div>
  );
}
