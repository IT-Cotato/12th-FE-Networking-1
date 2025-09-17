// src/components/messages/ErrorMessage.tsx
import React from "react";
import styled from "styled-components";

interface ErrorMessageProps {
  message: string;
}

const ErrorContainer = styled.div`
  background-color: ${({ theme }) => theme.errorBg};
  color: ${({ theme }) => theme.errorText};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

export default ErrorMessage;
