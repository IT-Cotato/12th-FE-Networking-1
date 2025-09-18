import { useMemo, useState } from "react";
import type { Movie } from "../types/movie";

export const useMovieSearch = (source: Movie[]) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return source;

    return source.filter((m) =>
      [m.title, String(m.year), String(m.rating ?? "")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, source]);

  return { query, setQuery, filtered };
};
