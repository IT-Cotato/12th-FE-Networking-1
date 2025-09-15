import React from "react";
import { themes } from "../styles/theme";

interface EmptyMessageProps {
  currentTheme: typeof themes.light;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ currentTheme }) => (
  <div
    style={{
      backgroundColor: currentTheme.componentBg,
      color: currentTheme.text,
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
    }}
  >
    영화가 없습니다
  </div>
);
export default EmptyMessage;
