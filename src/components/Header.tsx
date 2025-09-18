import React from "react";
import styled from "styled-components";
import type { ThemeName, Theme } from "../styles/theme";
import { useThemeStore } from "../store/themeStore";

const HeaderContainer = styled.header<{ $theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: ${props => props.$theme.componentBg};
  border-radius: 12px;
  border: 1px solid ${props => props.$theme.border};
`;

const Title = styled.h1<{ $theme: Theme }>`
  margin: 0;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: -0.02em;
  color: ${props => props.$theme.text};
`;

const ThemeButton = styled.button<{ $theme: Theme }>`
  padding: 8px 16px;
  cursor: pointer;
  background: ${props => props.$theme.buttonBg};
  color: ${props => props.$theme.buttonText};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.01em;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export function Header() {
  const { themeName, currentTheme, toggleTheme } = useThemeStore();

  return (
    <HeaderContainer $theme={currentTheme}>
      <Title $theme={currentTheme}>코테이토 영화관</Title>
      <ThemeButton $theme={currentTheme} onClick={toggleTheme}>
        {themeName === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
      </ThemeButton>
    </HeaderContainer>
  );
}
