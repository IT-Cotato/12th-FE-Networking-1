import type { Movie } from '@/types/movie';
import type { ThemeName } from '@/types/theme';

import InputField from '@/components/common/InputField';
import TitleSection from '@/components/common/TitleSection';

interface MovieListProps {
  themeName: ThemeName;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  movies: Movie[];
  isLoading: boolean;
}

const MovieList = ({ themeName, searchTerm, setSearchTerm, movies, isLoading }: MovieListProps) => {
  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div
      className={`rounded-xl border border-solid p-5 ${themeName === 'light' ? 'border-gray bg-white' : 'bg-deepGray border-darkGray'}`}
    >
      <TitleSection size="h2" text="영화 목록" />
      <InputField
        themeName={themeName}
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="my-2 w-full"
      />
      {isLoading ? (
        <div>로딩 중...</div>
      ) : filteredMovies.length === 0 ? (
        <div>영화가 없습니다</div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className={`flex flex-col gap-1 rounded-lg p-3 ${themeName === 'light' ? 'bg-lightGray' : 'bg-darkGray'}`}
            >
              <span>
                {movie.title} ({movie.year}) - {movie.director}
              </span>
              <span>장르: {movie.genre}</span>
              <span>⭐: {movie.rating}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MovieList;
