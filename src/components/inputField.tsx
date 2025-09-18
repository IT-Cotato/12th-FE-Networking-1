import React from 'react';



import type { ThemeName } from '@/types/theme';





interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  themeName: ThemeName;
  className?: string;
}

const InputField = ({ type = 'text', className, themeName, placeholder, value, onChange }: InputFieldProps) => {
  const baseClass = `text-lab1-med rounded-lg border border-solid p-2 focus:outline-none ${
    themeName === 'light' ? 'border-gray bg-white text-black' : 'border-darkGray bg-darkGray text-white'
  }`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseClass} ${className ?? ''}`}
    />
  );
};

export default InputField;