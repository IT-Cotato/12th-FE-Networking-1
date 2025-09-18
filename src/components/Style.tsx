import styled from "styled-components";

export const Input = styled.input<{ width?: string }>`
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #d792f4ff;
  background-color: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.text};
  width: ${(props) => props.width || "100%"};
`;
