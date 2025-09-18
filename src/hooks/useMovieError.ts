import { useState } from 'react';

export function useMovieError() {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError(String(err));
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError,
  };
}
