import { useTheme } from "../hooks/useTheme";

interface ButtonProps {
  text: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({ text, buttonType, onClick }: ButtonProps) => {
  const { currentTheme } = useTheme();

  return (
    <button
      type={buttonType}
      onClick={onClick}
      style={{
        padding: "8px 16px",
        backgroundColor: currentTheme.buttonBg,
        color: currentTheme.buttonText,
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
