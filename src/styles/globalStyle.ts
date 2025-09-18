import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`;
