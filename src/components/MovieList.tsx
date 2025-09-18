import React from "react";
import { useThemeStore } from "../stores/themeStore";
import { useMovieStore } from "../stores/movieStore";

export const MovieList: React.FC = () => {
    const { currentTheme } = useThemeStore();
    const { filteredMovies, searchTerm, setSearchTerm, isLoading } = useMovieStore();
    return (
        <div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-6"
            style={{
                backgroundColor: currentTheme.componentBg,
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${currentTheme.border}`,
                padding: '24px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: currentTheme.text, margin: 0 }}>영화 목록</h2>
            </div>
            
            <div style={{ position: 'relative', marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="영화를 검색해보세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        padding: '12px 16px 12px 16px',
                        borderRadius: '12px',
                        border: `1px solid ${currentTheme.border}`,
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.text,
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280' }}>
                        <div style={{
                            width: '24px',
                            height: '24px',
                            border: '2px solid #fce7f3',
                            borderTop: '2px solid #ec4899',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <span style={{ fontSize: '18px' }}>로딩 중...</span>
                    </div>
                </div>
            ) : filteredMovies.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</div>
                    <p style={{ color: '#6b7280', fontSize: '18px', margin: 0 }}>영화가 없습니다</p>
                </div>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '16px' 
                }}>
                    {filteredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            style={{
                                backgroundColor: currentTheme.hoverBg,
                                borderRadius: '12px',
                                padding: '16px',
                                border: `1px solid ${currentTheme.border}`,
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <h3 style={{ 
                                    fontWeight: 'bold', 
                                    color: currentTheme.text, 
                                    fontSize: '18px', 
                                    lineHeight: '1.4',
                                    margin: 0,
                                    flex: 1
                                }}>
                                    {movie.title}
                                </h3>
                                <div style={{ fontSize: '20px', marginLeft: '8px' }}>🎬</div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '14px', color: currentTheme.text }}>🎭</span>
                                    <span style={{ fontSize: '14px', color: currentTheme.text }}>{movie.director}</span>
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '14px', color: currentTheme.text }}>📅</span>
                                    <span style={{ fontSize: '14px', color: currentTheme.text }}>{movie.year}</span>
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '14px', color: currentTheme.text }}>🎨</span>
                                    <span style={{ fontSize: '14px', color: currentTheme.text }}>{movie.genre}</span>
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '14px', color: currentTheme.text }}>⭐</span>
                                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#f59e0b' }}>{movie.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}