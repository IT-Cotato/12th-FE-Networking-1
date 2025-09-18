import React from "react";
import { useThemeStore } from "../stores/themeStore";
import { useMovieStore } from "../stores/movieStore";

export const ErrorMessage: React.FC = () => {
    const { currentTheme } = useThemeStore();
    const { error } = useMovieStore();

    if (!error) return null;
    
    return (
        <div 
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3 animate-pulse"
            style={{
                backgroundColor: currentTheme.errorBg,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'pulse 2s infinite'
            }}
        >
            <div style={{ fontSize: '20px' }}>⚠️</div>
            <div style={{ color: currentTheme.errorText, fontWeight: '500', fontSize: '16px' }}>{error}</div>
        </div>
    )
}