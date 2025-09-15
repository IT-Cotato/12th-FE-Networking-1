import React from "react";
import { themes } from "../styles/theme";

interface ErrorMessageProps {
  message: string;
  currentTheme: typeof themes.light;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  currentTheme,
}) => (
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

export default ErrorMessage;
