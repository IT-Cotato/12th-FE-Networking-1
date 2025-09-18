import { useState } from "react";

interface UseMutationResultType<T, V> {
  mutate: (payload: V) => Promise<T | void>;
  isLoading: boolean;
  error: string | null;
}

export const useMutation = <T, V>(
  fetchFunction: (payload: V) => Promise<T>
): UseMutationResultType<T, V> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (payload: V) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFunction(payload);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err.message);
      } else {
        setError(String(err));
        console.error(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};
