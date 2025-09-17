import React from "react";
// import type { Theme, ThemeName } from "../styles/theme";
// import useMovies from "../hooks/useMovies";
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

// function Header({ theme, themeName, onToggleTheme }: HeaderProps) {
//   return (
//     <header
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 24,
//         padding: 16,
//         background: theme.componentBg,
//         borderRadius: 12,
//         border: `1px solid ${theme.border}`,
//       }}
//     >
//       <h1 style={{ margin: 0 }}>코테이토 영화관</h1>
//       <button
//         onClick={onToggleTheme}
//         style={{
//           padding: "8px 16px",
//           cursor: "pointer",
//           background: theme.buttonBg,
//           color: theme.buttonText,
//           border: "none",
//           borderRadius: 8,
//         }}
//       >
//         {themeName === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
//       </button>
//     </header>
//   );
// }
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

//export default Header;

