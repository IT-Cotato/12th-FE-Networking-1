import type { ReactNode } from "react";
import type { Theme } from "../styles/theme";

interface HeaderProps {
  currentTheme: Theme;
  flexRowJustifyContent: "start" | "end";
  title: string;
  children?: ReactNode;
}

/**
 *
 * @param currentTheme interface Theme 형태의 색상 모드 객체이다.
 * @param flexRowJustifyContent children의 start 또는 end 정렬을 결정한다. 기본값은 end이다.
 * @param title Header 컴포넌트에 나타낼 제목이다.
 * @param children nullable이며 Header 컴포넌트 제목 우측에 위치하는 자식 컴포넌트이다.
 * @returns Header 컴포넌트
 */
const Header = ({
  currentTheme,
  flexRowJustifyContent = "end",
  title,
  children,
}: HeaderProps) => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "24px",
        padding: "16px",
        backgroundColor: currentTheme.componentBg,
        borderRadius: "12px",
        border: `1px solid ${currentTheme.border}`,
      }}
    >
      <h1 style={{ margin: 0 }}>{title}</h1>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: flexRowJustifyContent,
          gap: "5px",
        }}
      >
        {children}
      </div>
    </header>
  );
};

export default Header;
