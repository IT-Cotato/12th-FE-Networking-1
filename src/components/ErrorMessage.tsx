import React from "react";
import { useThemeStore } from "../stores/themeStore";
import { useMovieStore } from "../stores/movieStore";

export const ErrorMessage: React.FC = () => {
    const { currentTheme } = useThemeStore();
    const { error } = useMovieStore();

    if (!error) return null;
    
    return (
        <div
            style={{
                backgroundColor: currentTheme.errorBg,
                color: currentTheme.errorText,
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px"
            }}
        >
            {error}
        </div>
    )
}