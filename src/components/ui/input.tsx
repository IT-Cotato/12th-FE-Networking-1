import { twMerge } from "tailwind-merge";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        "p-2 rounded-lg border border-gray bg-white text-black dark:border-dark-gray dark:bg-dark-gray dark:text-white",
        className,
      )}
      {...props}
    ></input>
  );
}
