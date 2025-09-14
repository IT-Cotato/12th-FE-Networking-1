import type { ButtonHTMLAttributes } from "react";
import type { ThemeName } from "../../styles/theme";

export default function Button({
  className,
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 cursor-pointer border-0 rounded-lg bg-purple text-white dark:bg-purple dark:text-white"
    >
      {children}
    </button>
  );
}
