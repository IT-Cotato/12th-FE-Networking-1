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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      className={`min-h-screen p-5 transition-all duration-200 ease-linear ${themeName === 'light' ? 'bg-lightBackground text-black' : 'bg-darkBackground text-white'}`}
    >
      <Header themeName={themeName} onThemeChange={setThemeName} />

      {addError &&(
        <CommonModal
          message={addError}
          onClose={() => {
            setIsModalOpen(false);
            handleClearAddError();
          }}
          themeName={themeName}
        />
      )}

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
      
      <MovieList
        themeName={themeName}
        movies={filteredMovies}
        isLoading={isLoading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;
