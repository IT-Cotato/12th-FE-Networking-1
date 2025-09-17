import React from "react";
import styled from "styled-components";
import type { Theme, ThemeName } from "@/styles/theme";


type Props = {
  theme: Theme;
  themeName: ThemeName;
  onToggleTheme: () => void;
};

const Wrap = styled.header<{ $theme: Theme }>`
  display:flex; justify-content:space-between; align-items:center;
  margin-bottom:24px; padding:16px; border-radius:12px;
  background: ${(p) => p.$theme.componentBg};
  border: 1px solid ${(p) => p.$theme.border};
`;

const Btn = styled.button<{ $theme: Theme }>`
  padding: 8px 16px; border:0; border-radius:8px; cursor:pointer;
  background: ${(p) => p.$theme.buttonBg}; color: ${(p) => p.$theme.buttonText};
`;

export default function Header({ theme, themeName, onToggleTheme }: Props) {
  return (
    <Wrap $theme={theme}>
      <h1 style={{ margin: 0 }}>코테이토 영화관</h1>
      <Btn $theme={theme} onClick={onToggleTheme}>
        {themeName === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
      </Btn>
    </Wrap>
  );
}


