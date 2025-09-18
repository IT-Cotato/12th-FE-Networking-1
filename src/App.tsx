import Header from "./components/Header";
import MovieForm from "./components/Movie/MovieForm";
import MovieList from "./components/Movie/MovieList";
import { useMovies } from "./hooks/useMovies";
import { useTheme } from "./hooks/useTheme";
import "./styles/index.css";

function App() {
  const { movies, isLoading, error, addMovie, deleteMovie } = useMovies();
  const { themeName, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen p-5 transition-all duration-200 ${
        themeName === "light"
          ? "bg-white text-gray-800"
          : "bg-gray-900 text-gray-200"
      }`}
    >
      <Header themeName={themeName} onToggleTheme={toggleTheme} />
      {error && (
        <div
          className={`p-3 rounded-lg mb-5 ${
            themeName === "light"
              ? "bg-red-100 text-red-800"
              : "bg-red-900 text-red-200"
          }`}
        >
          {error}
        </div>
      )}
      <MovieForm themeName={themeName} onAddMovie={addMovie} />
      <MovieList
        movies={movies}
        isLoading={isLoading}
        themeName={themeName}
        onDeleteMovie={deleteMovie}
      />
    </div>
  );
}

export default App;
