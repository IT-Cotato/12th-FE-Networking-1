import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import { useMovies } from "./hooks/useMovies";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { movies, isLoading, error, addMovie } = useMovies();
  const { themeName, currentTheme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.2s ease",
      }}
    >
      <Header themeName={themeName} onToggleTheme={toggleTheme} />
      {error && (
        <div
          style={{
            backgroundColor: currentTheme.errorBg,
            color: currentTheme.errorText,
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}
      <MovieForm themeName={themeName} onAddMovie={addMovie} />
      <MovieList movies={movies} isLoading={isLoading} themeName={themeName} />
    </div>
  );
}

export default App;
