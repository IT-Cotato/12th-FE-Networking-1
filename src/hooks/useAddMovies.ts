import { useMovieStore } from "../stores/movieStore";

export function useAddMovie() {
  const { movies, setMovies, setIsLoading, setError } = useMovieStore();

  const addMovie = async (newMovie: {
    title: string;
    director: string;
    year: number;
    genre: string;
    rating: number;
  }) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error("영화를 추가하지 못했습니다.");
      const savedMovie = await res.json();

      setMovies([...movies, savedMovie]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { addMovie };
}
