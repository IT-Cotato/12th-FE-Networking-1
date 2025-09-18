import React, { useState } from 'react';

import type { Movie } from '../types/movie';
import type { Theme } from '../styles/theme';

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentTheme: Theme;
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading,
  searchTerm,
  onSearchChange,
  currentTheme
}) => {
  const [favoriteList, setFavoriteList] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'favorite'>('list');

  const handleFavorite = (title: string) => {
    const movie = movies.find(m => m.title === title);
    if (movie && !favoriteList.some(f => f.id === movie.id)) {
      setFavoriteList(prev => [...prev, movie]);
      alert(`"${title}" 찜 완료!`);
    } else if (movie) {
      alert(`"${title}" 이미 찜한 영화입니다.`);
    }
  };

  const handleUnfavorite = (id: number) => {
    setFavoriteList(prev => prev.filter(movie => movie.id !== id));
    alert("찜 해제 완료!");
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: currentTheme.componentBg,
        border: `1px solid ${currentTheme.border}`,
      }}
      className="shadow-md"
    >
      {/* 탭 메뉴 */}
      <div className="flex gap-2 mb-6">
        <button
          style={{
            backgroundColor: activeTab === 'list' ? currentTheme.buttonBg : currentTheme.hoverBg,
            color: activeTab === 'list' ? currentTheme.buttonText : currentTheme.text,
            border: `1px solid ${currentTheme.border}`,
            borderBottom: activeTab === 'list' ? "none" : undefined,
            borderRadius: "8px 8px 0 0",
            fontWeight: 600,
            padding: "8px 16px",
            transition: "background 0.2s",
          }}
          onClick={() => setActiveTab('list')}
        >
          영화 목록
        </button>
        <button
          style={{
            backgroundColor: activeTab === 'favorite' ? currentTheme.buttonBg : currentTheme.hoverBg,
            color: activeTab === 'favorite' ? currentTheme.buttonText : currentTheme.text,
            border: `1px solid ${currentTheme.border}`,
            borderBottom: activeTab === 'favorite' ? "none" : undefined,
            borderRadius: "8px 8px 0 0",
            fontWeight: 600,
            padding: "8px 16px",
            transition: "background 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          onClick={() => setActiveTab('favorite')}
        >
          <span role="img" aria-label="찜">❤️</span> 찜한 영화
        </button>
      </div>

      {/* 탭 내용 */}
      {activeTab === 'list' ? (
        <>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: `1px solid ${currentTheme.border}`,
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
              marginBottom: "16px",
              width: "100%",
            }}
            className="focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {isLoading ? (
            <div className="text-center text-gray-500">로딩 중...</div>
          ) : movies.length === 0 ? (
            <div className="text-center text-gray-400">영화가 없습니다</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: currentTheme.hoverBg,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                  className="hover:shadow-lg transition-shadow"
                >
                  <span className="font-semibold">
                    {movie.title} ({movie.year}) - {movie.director}
                  </span>
                  <span>장르: {movie.genre}</span>
                  <span>⭐: {movie.rating}</span>
                  <button
                    type="button"
                    onClick={() => handleFavorite(movie.title)}
                    style={{
                      marginTop: "8px",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      backgroundColor: currentTheme.buttonBg,
                      color: currentTheme.buttonText,
                      border: `1px solid ${currentTheme.border}`,
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "background 0.2s",
                    }}
                  >
                    <span role="img" aria-label="찜">❤️</span> 찜하기
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          {favoriteList.length === 0 ? (
            <div className="text-gray-400">아직 찜한 영화가 없습니다.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {favoriteList.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: currentTheme.hoverBg,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                  className="hover:shadow-lg transition-shadow"
                >
                  <span className="font-semibold">
                    {movie.title} ({movie.year}) - {movie.director}
                  </span>
                  <span>장르: {movie.genre}</span>
                  <span>⭐: {movie.rating}</span>
                  <button
                    type="button"
                    onClick={() => handleUnfavorite(movie.id)}
                    style={{
                      marginTop: "8px",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      backgroundColor: currentTheme.buttonBg,
                      color: currentTheme.buttonText,
                      border: `1px solid ${currentTheme.border}`,
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "background 0.2s",
                    }}
                  >
                    <span role="img" aria-label="찜 해제">💔</span> 찜 해제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};