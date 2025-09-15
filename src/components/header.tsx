import DarkModeToggle from "./dark-mode-toggle";

export default function Header() {
  return (
    <header
      className="flex justify-between items-center mb-6 p-4 rounded-xl
      bg-white dark:bg-deep-gray border border-gray dark:border-dark-gray dark:text-white
      "
    >
      <h1 className="m-0 text-[2em] font-bold">코테이토 영화관</h1>
      <DarkModeToggle />
    </header>
  );
}
