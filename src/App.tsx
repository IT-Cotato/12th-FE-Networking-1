import React, { useState, useEffect, useMemo } from "react";
import type { Movie } from "./types/movie";
import { AppProvider } from "./context/AppContext";
import { useMovies } from "./hooks/useMovies";
import { useMovieSearch } from "./hooks/useMovieSearch";
import { useMovieForm } from "./hooks/useMovieForm";
import { useAppContext } from "./context/AppContext";

import Header from "./components/Header";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

function AppContent(){
  const { isDark } = useAppContext();
  const { movies, isLoading, error, addMovie } = useMovies();
  const { searchTerm, setSearchTerm, filteredMovies } = useMovieSearch(movies);

  return (
     <div className={`${isDark ? "dark" : ""}`}>
     <div className="p-6 bg-lightBackground text-black dark:bg-darkBackground dark:text-white transition-all duration-200">
      <Header/>
      </div>

      <div className="h-screen bg-lightBackground text-black dark:bg-darkBackground dark:text-white transition-all duration-200">
      
      {error && (
       <div className="mb-5 p-3 rounded bg-lightRed text-red dark:bg-deepGray dark:text-pink">
          {error}
        </div>
      )}

      <MovieForm/>

      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <MovieList/>
      </div>
      </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent/>
    </AppProvider>
  )
}

export default App;