import React from "react";
import { themes } from "../../styles/theme";

interface LoadingMessageProps {
  currentTheme: typeof themes.light;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ currentTheme }) => (
  <div
    style={{
      backgroundColor: currentTheme.componentBg,
      color: currentTheme.text,
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
    }}
  >
    로딩 중...
  </div>
);
export default LoadingMessage;
