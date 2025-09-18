import React from "react";
import { themes } from "../styles/theme";

interface ErrorMessageProps {
  message: string;
  themeName?: "light" | "dark";
}

export default function ErrorMessage({
  message,
  themeName = "light",
}: ErrorMessageProps) {
  const currentTheme = themes[themeName];
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
      {message}
    </div>
  );
}
