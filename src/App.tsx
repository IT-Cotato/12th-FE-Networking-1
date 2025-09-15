import Header from "@/components/header";
import MovieForm from "@/components/movie-form";
import MovieList from "@/components/movie-list";

function App() {
  return (
    <div className="bg-light-background dark:bg-dark-background text-black dark:text-white min-h-screen p-5 transition-all duration-200 ease-in-out">
      <Header />
      <MovieForm />
      <MovieList />
    </div>
  );
}

export default App;
