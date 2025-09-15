import { type Movie } from "@/types/movie";
import { CHO, decomposeHangul, getChosung } from "./hangul";

export function filterMovies(movies: Movie[], searchTerm: string): Movie[] {
  const processedSearchTerm = searchTerm.toLowerCase().replace(/\s/g, "");

  if (!processedSearchTerm) {
    return movies;
  }

  // 규칙 1: 검색어가 한 글자이고 초성 자음일 경우 -> 초성 검색
  if (processedSearchTerm.length === 1 && CHO.includes(processedSearchTerm)) {
    return movies.filter((movie) => {
      const titleChosung = getChosung(movie.title.toLowerCase());
      return titleChosung.includes(processedSearchTerm);
    });
  }

  // 규칙 2: 그 외 모든 경우 -> 자소 분해 검색
  return movies.filter((movie) => {
    const processedTitle = movie.title.toLowerCase().replace(/\s/g, "");
    const decomposedTitle = decomposeHangul(processedTitle);
    const decomposedSearchTerm = decomposeHangul(processedSearchTerm);
    return decomposedTitle.includes(decomposedSearchTerm);
  });
}
