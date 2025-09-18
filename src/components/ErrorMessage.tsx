import React from "react";
import { useThemeStore } from "../stores/themeStore";

interface ErrorMessageProps {
    error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({error}) => {
    const {currentTheme } = useThemeStore();

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