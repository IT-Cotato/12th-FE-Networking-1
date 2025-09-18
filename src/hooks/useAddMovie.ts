import { useState } from 'react';

import type { Movie } from '../types/movie';

export function useAddMovie(onMovieAdded: (movie: Movie) => void) {
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDirector, setNewDirector] = useState<string>('');
  const [newYear, setNewYear] = useState<number | ''>('');
  const [newGenre, setNewGenre] = useState<string>('');
  const [newRating, setNewRating] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDirector || !newYear || !newGenre || !newRating) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    const newMovie = {
      title: newTitle,
      director: newDirector,
      year: Number(newYear),
      genre: newGenre,
      rating: Number(newRating),
    };

    try {
      setIsLoading(true);
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error('영화를 추가하지 못했습니다.');

      const savedMovie: Movie = await res.json();
      onMovieAdded(savedMovie);

      setNewTitle('');
      setNewDirector('');
      setNewYear('');
      setNewGenre('');
      setNewRating('');
      setError(null);
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

  return {
    newTitle,
    setNewTitle,
    newDirector,
    setNewDirector,
    newYear,
    setNewYear,
    newGenre,
    setNewGenre,
    newRating,
    setNewRating,
    error,
    isLoading,
    handleAddMovie,
  };
}
