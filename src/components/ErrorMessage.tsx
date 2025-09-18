import React from "react";
import {type Theme} from "../styles/theme";

interface ErrorMessageProps {
    error: string | null;
    currentTheme: Theme;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({error, currentTheme}) => {
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