import styled from "styled-components";
import { useThemeStore } from "../../state/themeStore";

const Bar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Btn = styled.button`
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
`;

export default function Header() {
  const { mode, toggle } = useThemeStore();
  return (
    <Bar>
      <strong>🎬 Movies</strong>
      <Btn onClick={toggle}>{mode === "light" ? "🌙 다크" : "☀️ 라이트"}</Btn>
    </Bar>
  );
}
