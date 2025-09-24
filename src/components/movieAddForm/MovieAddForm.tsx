import type { ThemeName } from '@/types/theme';

import TitleSection from '@/components/common/TitleSection';
import InputField from '@/components/common/InputField';

interface MovieAddFormProps {
  themeName: ThemeName;
  newTitle: string;
  newDirector: string;
  newYear: number | '';
  newGenre: string;
  newRating: number | '';
  isAdding: boolean;
  setNewTitle: (title: string) => void;
  setNewDirector: (director: string) => void;
  setNewYear: (year: number | '') => void;
  setNewGenre: (genre: string) => void;
  setNewRating: (rating: number | '') => void;
  handleAddMovie: (e: React.FormEvent) => void;
}
const MovieAddForm = ({
  themeName,
  newTitle,
  newDirector,
  newYear,
  newGenre,
  newRating,
  isAdding,
  setNewDirector,
  setNewTitle,
  setNewYear,
  handleAddMovie,
  setNewGenre,
  setNewRating,
}: MovieAddFormProps) => {
  return (
    <div
      className={`rounded-xl border border-solid p-5 ${themeName === 'light' ? 'border-gray bg-white' : 'bg-deepGray border-darkGray'}`}
    >
      <TitleSection size="h2" text="영화 추가" />
      <form onSubmit={handleAddMovie} className="flex flex-wrap gap-3 py-2">
        <InputField
          themeName={themeName}
          type="text"
          placeholder="제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <InputField
          themeName={themeName}
          type="text"
          placeholder="감독"
          value={newDirector}
          onChange={(e) => setNewDirector(e.target.value)}
        />
        <InputField
          themeName={themeName}
          type="number"
          placeholder="연도"
          value={newYear}
          onChange={(e) => setNewYear(Number(e.target.value))}
          className="w-20"
        />
        <InputField
          themeName={themeName}
          type="text"
          placeholder="장르"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
        />
        <InputField
          themeName={themeName}
          type="number"
          placeholder="평점"
          value={newRating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 10) setNewRating(val);
          }}
          className="w-25"
        />
        <button
          type="submit"
          className="bg-purple cursor-pointer rounded-lg border-none px-4 py-2 text-white"
          disabled={isAdding}
        >
          추가
        </button>
      </form>
    </div>
  );
};
export default MovieAddForm;
