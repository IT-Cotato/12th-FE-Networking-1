import { useTheme } from "../../hooks/useTheme";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const { currentTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: currentTheme.errorBg,
        color: currentTheme.errorText,
        padding: "12px",
        borderRadius: "8px",
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
