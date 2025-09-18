import { useCallback, useEffect, useState } from "react";

interface UseFetchResultType<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useFetch = <T>(
  fetchFunction: () => Promise<T>
): UseFetchResultType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
      setError(null);
    } catch (err: unknown) {
      setData(null);
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
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
};
