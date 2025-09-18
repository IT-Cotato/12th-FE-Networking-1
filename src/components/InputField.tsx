import { useTheme } from "../hooks/useTheme";

interface InputFieldProps {
  inputType: "text" | "number";
  placeholder: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: object;
}

const InputField = ({
  inputType,
  placeholder,
  name,
  value,
  onChange,
  style,
}: InputFieldProps) => {
  const { currentTheme } = useTheme();

  return (
    <input
      type={inputType}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      style={{
        padding: "8px",
        borderRadius: "8px",
        border: `1px solid ${currentTheme.border}`,
        backgroundColor: currentTheme.inputBg,
        color: currentTheme.text,
        minWidth: "0px",
        ...style,
      }}
    />
  );
};

export default InputField;
