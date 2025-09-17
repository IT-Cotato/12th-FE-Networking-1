import React from "react";
import Button from "./common/Button";

interface MovieFormProps {
  isDark:boolean;
  newTitle: string;
  newDirector: string;
  newYear: number | "";
  newGenre: string;
  newRating: number | "";
  onTitleChange: (v: string) => void;
  onDirectorChange: (v: string) => void;
  onYearChange: (v: number | "") => void;
  onGenreChange: (v: string) => void;
  onRatingChange: (v: number | "") => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({
  isDark,
  newTitle,
  newDirector,
  newYear,
  newGenre,
  newRating,
  onTitleChange,
  onDirectorChange,
  onYearChange,
  onGenreChange,
  onRatingChange,
  onSubmit,
}) => {

  return (
    <div className="p-6 bg-lightBackground text-black dark:bg-darkBackground dark:text-white transition-all duration-200">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">영화 추가</h2>
      <form
        onSubmit={onSubmit}
        className="flex gap-3 flex-wrap bg-white dark:bg-deepGray p-6 rounded-lg border border-gray dark:border-darkGray"
      >
        <input
          type="text"
          placeholder="제목"
          value={newTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          className="p-2 rounded border border-gray dark:border-darkGray bg-white dark:bg-darkGray text-black dark:text-white"
        />
        <input
          type="text"
          placeholder="감독"
          value={newDirector}
          onChange={(e) => onDirectorChange(e.target.value)}
          className="p-2 rounded border border-gray dark:border-darkGray bg-white dark:bg-darkGray text-black dark:text-white"
        />
        <input
          type="number"
          placeholder="연도"
          value={newYear}
          onChange={(e) =>
            onYearChange(e.target.value ? Number(e.target.value) : "")
          }
          className="p-2 rounded border border-gray dark:border-darkGray bg-white dark:bg-darkGray text-black dark:text-white"
        />
        <input
          type="text"
          placeholder="장르"
          value={newGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="p-2 rounded border border-gray dark:border-darkGray bg-white dark:bg-darkGray text-black dark:text-white"
        />
        <input
          type="number"
          placeholder="평점"
          value={newRating}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 && val <= 10) onRatingChange(val);
          }}
          className="p-2 rounded border border-gray dark:border-darkGray bg-white dark:bg-darkGray text-black dark:text-white"
        />
      
       <Button type="submit">
        추가
       </Button>
      </form>
    </div>
  );
};

export default MovieForm;