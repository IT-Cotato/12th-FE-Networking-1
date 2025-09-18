// src/components/messages/EmptyMessage.tsx
import React from "react";
import styled from "styled-components";

const EmptyContainer = styled.div`
  background-color: ${({ theme }) => theme.componentBg};
  color: ${({ theme }) => theme.text};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const EmptyMessage: React.FC = () => {
  return <EmptyContainer>영화가 없습니다</EmptyContainer>;
};

export default EmptyMessage;
