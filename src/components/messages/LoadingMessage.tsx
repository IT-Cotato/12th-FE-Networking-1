// src/components/messages/LoadingMessage.tsx
import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  color: ${({ theme }) => theme.text};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const LoadingMessage: React.FC = () => {
  return <LoadingContainer>로딩 중...</LoadingContainer>;
};

export default LoadingMessage;
