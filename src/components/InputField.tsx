import { useTheme } from "../hooks/useTheme";

interface InputFieldProps {
  inputType: "text" | "number";
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: object;
}

const InputField = ({
  inputType,
  placeholder,
  value,
  onChange,
  style,
}: InputFieldProps) => {
  const { currentTheme } = useTheme();

  return (
    <input
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "8px",
        borderRadius: "8px",
        border: `1px solid ${currentTheme.border}`,
        backgroundColor: currentTheme.inputBg,
        color: currentTheme.text,
        ...style,
      }}
    />
  );
};

export default InputField;
