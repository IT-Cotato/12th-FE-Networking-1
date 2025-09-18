import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {

  return (
    <button
      {...props}
      className="bg-yellowPoint text-black px-4 py-2 h-11 rounded hover:bg-yellow-400 dark:bg-yellowPoint dark:text-black dark:hover:bg-yellow-300"
    >
      {children}
    </button>
  );
};

export default Button;
