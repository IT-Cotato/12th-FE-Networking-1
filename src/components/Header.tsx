import React from "react";
import { useThemeStore } from "../stores/themeStore";

export const Header: React.FC = () => {
  const { themeName, currentTheme, toggleTheme } = useThemeStore();

  return (
    <header 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-6 mb-6 flex justify-between items-center"
      style={{
        backgroundColor: currentTheme.componentBg,
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${currentTheme.border}`,
        padding: '24px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: currentTheme.text,
          margin: 0
        }}>
          코테이토 영화관
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-2"
        style={{
          padding: '8px 16px',
          backgroundColor: currentTheme.buttonBg,
          color: currentTheme.buttonText,
          borderRadius: '25px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '18px' }}>
          {themeName === "light" ? "🌙" : "☀️"}
        </span>
        <span>
          {themeName === "light" ? "다크모드" : "라이트모드"}
        </span>
      </button>
    </header>
  );
};
