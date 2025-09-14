import useDarkMode from "../hooks/use-dark-mode";
import Button from "./ui/button";

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <Button onClick={toggle}>
      {!isDark ? "🌙 다크모드" : "☀️ 라이트모드"}
    </Button>
  );
}
