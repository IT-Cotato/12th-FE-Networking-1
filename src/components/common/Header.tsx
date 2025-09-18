import styled from "styled-components";
import { useThemeStore } from "../../state/themeStore";

const Bar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const Btn = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  background: ${({ theme }) => theme.toggleBg};
  color: ${({ theme }) => theme.toggleText};
`;

export default function Header() {
  const { mode, toggle } = useThemeStore();
  return (
    <Bar>
      <Title>🍿Jeongbam&apos;s Theater🍿</Title>
      <Btn onClick={toggle}>
        {mode === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
      </Btn>
    </Bar>
  );
}
