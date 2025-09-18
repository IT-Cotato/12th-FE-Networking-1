// src/components/Header.tsx
import React from "react";
import styled from "styled-components";
import type { ThemeName } from "../styles/theme";

interface HeaderProps {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: ${({ theme }) => theme.componentBg};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h1`
  margin: 0;
`;

const ThemeButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
`;

const Header: React.FC<HeaderProps> = ({ themeName, setThemeName }) => {
  return (
    <HeaderContainer>
      <Title>코테이토 영화관</Title>
      <ThemeButton
        onClick={() => setThemeName(themeName === "light" ? "dark" : "light")}
      >
        {themeName === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
      </ThemeButton>
    </HeaderContainer>
  );
};

export default Header;
