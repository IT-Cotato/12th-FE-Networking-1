import { createHangulHighlighterRegex } from "@/utils/hangul";

export default function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  const cleanHighlight = highlight.trim();
  if (!cleanHighlight) {
    return <span>{text}</span>;
  }

  const regex = createHangulHighlighterRegex(cleanHighlight);
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <span
              key={index}
              className="bg-yellow-300 dark:bg-yellow-500 rounded px-1"
            >
              {part}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
}
