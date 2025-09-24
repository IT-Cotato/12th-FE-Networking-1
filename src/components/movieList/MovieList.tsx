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
      className={`flex h-[calc(100vh-260px)] flex-col rounded-xl border border-solid ${
        themeName === 'light' ? 'border-gray bg-white' : 'bg-deepGray border-darkGray'
      }`}
    >
      {/* sticky 영역 */}
      <div
        className={`sticky top-0 z-10 ${
          themeName === 'light' ? 'border-gray bg-white' : 'bg-deepGray border-darkGray'
        } p-5`}
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
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : filteredMovies.length === 0 ? (
          <div>영화가 없습니다</div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className={`flex flex-col gap-1 rounded-lg p-3 ${
                  themeName === 'light' ? 'bg-lightGray' : 'bg-darkGray'
                }`}
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
    </div>
  );
};
export default MovieList;
