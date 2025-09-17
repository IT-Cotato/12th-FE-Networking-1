import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("context api provider를 읽어올 수 없습니다.");
  }
  return context;
};
