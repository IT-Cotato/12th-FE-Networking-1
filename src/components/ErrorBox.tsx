import React from "react";
import { type Theme } from "../styles/theme";

interface ErrorBoxProps {
  error: string | null;
  currentTheme: Theme;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ error, currentTheme }) => {
  if (!error) return null;

  return (
    <div
      style={{
        backgroundColor: currentTheme.errorBg,
        color: currentTheme.errorText,
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      {error}
    </div>
  );
};

export default ErrorBox;
