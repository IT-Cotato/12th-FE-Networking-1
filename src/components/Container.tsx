import type { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

interface ContainerProps {
  title?: string;
  children: ReactNode;
}

const Container = ({ title, children }: ContainerProps) => {
  const { currentTheme } = useTheme();

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: currentTheme.componentBg,
        border: `1px solid ${currentTheme.border}`,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2
        style={{
          fontWeight: "700",
          fontSize: "24px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

export default Container;
