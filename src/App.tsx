import { useState } from 'react';

import type { ThemeName } from '@/types/theme';

import CommonModal from '@/components/common/CommonModal';
import Header from '@/components/header/Header';
import MovieAddForm from '@/components/movieAddForm/MovieAddForm';
import MovieList from '@/components/movieList/MovieList';

import { useAddMovie } from '@/hooks/useAddMovie';
import { useFilteredMovies } from '@/hooks/useFilteredMovies';

import { useMovies } from './hooks/useMovies';

function App() {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const [, setIsModalOpen] = useState(false);

  const { movies, setMovies, isLoading } = useMovies();
  const { searchTerm, setSearchTerm, filteredMovies } = useFilteredMovies(movies);

  const {
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
    error: addError,
    isLoading: isAdding,
    handleAddMovie,
    handleClearAddError,
  } = useAddMovie((movie) => setMovies((prev) => [...prev, movie]));

  return (
    <div
      className={`min-h-screen transition-all duration-200 ease-linear ${themeName === 'light' ? 'bg-lightBackground text-black' : 'bg-darkBackground text-white'}`}
    >
      <div className="fixed top-0 left-0 flex w-full flex-col gap-5 p-1">
        <Header themeName={themeName} onThemeChange={setThemeName} />

        <MovieAddForm
          themeName={themeName}
          newTitle={newTitle}
          newDirector={newDirector}
          newYear={newYear}
          newGenre={newGenre}
          newRating={newRating}
          isAdding={isAdding}
          setNewDirector={setNewDirector}
          setNewTitle={setNewTitle}
          setNewYear={setNewYear}
          handleAddMovie={handleAddMovie}
          setNewGenre={setNewGenre}
          setNewRating={setNewRating}
        />
        <div className="h-[calc(100vh-260px)] overflow-y-auto">
          <MovieList
            themeName={themeName}
            movies={filteredMovies}
            isLoading={isLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>

      {/* 에러 모달 */}
      {addError && (
        <CommonModal
          message={addError}
          onClose={() => {
            setIsModalOpen(false);
            handleClearAddError();
          }}
          themeName={themeName}
        />
      )}
    </div>
  );
}

export default App;
