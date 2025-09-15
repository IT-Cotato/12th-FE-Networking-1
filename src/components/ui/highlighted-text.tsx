import { findHighlightIndices } from "@/utils/hangul";

export default function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  // 1. 인덱스를 계산하는 로직을 호출합니다.
  const indices = findHighlightIndices(text, highlight);

  // 2. 인덱스가 없으면, 원본 텍스트를 그대로 렌더링합니다.
  if (!indices) {
    return <span>{text}</span>;
  }

  // 3. 인덱스가 있으면, 텍스트를 3부분으로 잘라 하이라이트 처리하여 렌더링합니다.
  const { startIndex, endIndex } = indices;
  const preMatch = text.substring(0, startIndex - 1);
  const match = text.substring(startIndex, endIndex);
  const postMatch = text.substring(endIndex);

  return (
    <span>
      {preMatch}
      <span className="bg-yellow-300 dark:bg-yellow-500 rounded">{match}</span>
      {postMatch}
    </span>
  );
}
