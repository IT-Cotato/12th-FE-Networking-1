/**
 * =================================================================================
 * 한글 검색/하이라이팅 유틸리티 (hangul.ts)
 * =================================================================================
 * 이 파일은 한글의 복잡한 조합 원리를 이용하여,
 * 사용자가 입력하는 중간 과정에서도 검색과 하이라이팅이 끊기지 않도록 지원하는
 * 핵심 함수들을 포함하고 있습니다.
 */

// 초성(첫 자음)으로 사용될 수 있는 19개의 자음 리스트입니다.
export const CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 중성(가운데 모음)으로 사용될 수 있는 21개의 모음 리스트입니다.
const JUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

// 종성(받침)으로 사용될 수 있는 28개의 자음 리스트입니다. (받침이 없는 경우를 위해 맨 앞에 빈 문자열('')이 포함됩니다)
const JONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const JUNG_MAP: { [key: string]: string } = {
  ㅘ: "ㅗㅏ",
  ㅙ: "ㅗㅐ",
  ㅚ: "ㅗㅣ",
  ㅝ: "ㅜㅓ",
  ㅞ: "ㅜㅔ",
  ㅟ: "ㅜㅣ",
  ㅢ: "ㅡㅣ",
};
const JONG_MAP: { [key: string]: string } = {
  ㄳ: "ㄱㅅ",
  ㄵ: "ㄴㅈ",
  ㄶ: "ㄴㅎ",
  ㄺ: "ㄹㄱ",
  ㄻ: "ㄹㅁ",
  ㄼ: "ㄹㅂ",
  ㄽ: "ㄹㅅ",
  ㄾ: "ㄹㅌ",
  ㄿ: "ㄹㅍ",
  ㅀ: "ㄹㅎ",
  ㅄ: "ㅂㅅ",
};

const HANGUL_CONSONANTS_START = 0x3131;
const HANGUL_CONSONANTS_END = 0x314e;

// 한글 유니코드의 시작점인 '가'의 코드 포인트입니다. 이 값을 기준으로 계산이 시작됩니다.
const HANGUL_OFFSET = 0xac00;

/**
 * [함수 1] decomposeHangul: 한글 문자열을 자음과 모음 단위(자소)로 완벽하게 분해합니다.
 *
 * @param {string} str - 분해할 원본 문자열 (예: '좀비딸 F1')
 * @returns {string} - 자소 단위로 분해된 문자열 (예: 'ㅈㅗㅁㅂㅣㄸㅏㄹ F1')
 *
 * @description
 * 이 함수는 한글의 유니코드 조합 원리를 역으로 계산하여, 완성된 글자를 초성, 중성, 종성으로 풀어헤치는 역할을 합니다.
 * '조'를 검색할 때 '좀'을 찾을 수 있게 하는 검색 시스템의 가장 기본이 되는 함수입니다.
 */
export function decomposeHangul(str: string): string {
  let result = "";
  for (const char of str) {
    const code = char.charCodeAt(0);

    if (code >= 0xac00 && code <= 0xd7a3) {
      const index = code - 0xac00;
      const cho = CHO[Math.floor(index / 588)];
      const jung = JUNG[Math.floor((index % 588) / 28)];
      const jong = JONG[index % 28];

      // 1. 초성을 결과에 추가합니다.
      result += cho;

      // 2. 중성이 복합 모음인지 확인하고, 그렇다면 분해해서 추가합니다.
      result += JUNG_MAP[jung] || jung;

      // 3. 종성이 복합 받침인지 확인하고, 그렇다면 분해해서 추가합니다.
      if (jong) {
        result += JONG_MAP[jong] || jong;
      }
    } else {
      // 한글이 아니면 원본 글자를 그대로 추가합니다.
      result += char;
    }
  }
  return result;
}
/**
 * [함수 2] getChosung: 한글 문자열에서 초성(첫 자음)만 추출합니다.
 *
 * @param {string} str - 초성을 추출할 원본 문자열 (예: '좀비딸 F1')
 * @returns {string} - 초성만 추출된 문자열 (예: 'ㅈㅂㄸ F1')
 *
 * @description
 * 사용자가 'ㄹ'과 같은 단일 자음으로 검색할 때, '딸'의 받침 'ㄹ'이 아닌
 * '라디오스타'의 'ㄹ'만 찾아주기 위한 특별 규칙에 사용되는 함수입니다.
 */
export function getChosung(str: string): string {
  let result = "";
  for (const char of str) {
    const code = char.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const index = code - 0xac00;
      // decomposeHangul과 유사하지만, 초성 인덱스만 계산하여 결과에 추가합니다.
      const cho = Math.floor(index / 588);
      result += CHO[cho];
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * [함수 3] createHangulHighlighterRegex: 한글 검색어로 하이라이팅을 위한 정규식을 생성합니다.
 *
 * @param {string} search - 사용자가 입력한 검색어 (예: '좀ㅂ')
 * @returns {RegExp} - 하이라이팅에 사용될 정규식 객체 (예: /([좀-졿]\s*[ㅂ븨-빟])/gi)
 *
 * @description
 * 이 파일의 핵심이자 가장 복잡한 함수입니다.
 * 자소 분해된 검색어를 기반으로, 한글 입력의 모든 중간 과정을 커버할 수 있는
 * 동적인 정규식 패턴을 만들어냅니다.
 */

export function findHighlightIndices(
  text: string,
  searchTerm: string,
): { startIndex: number; endIndex: number } | null {
  const cleanSearchTerm = searchTerm.trim();
  if (!cleanSearchTerm) return null;

  // --- 👇 여기가 수정된 핵심 로직입니다 ---
  // 1. 텍스트와 검색어에서 모두 공백을 제거한 뒤, 자소 단위로 분해합니다. (필터링 로직과 동일)
  const decomposedText = decomposeHangul(text.replace(/\s/g, ""));
  const decomposedSearch = decomposeHangul(cleanSearchTerm.replace(/\s/g, ""));

  const matchIndex = decomposedText
    .toLowerCase()
    .indexOf(decomposedSearch.toLowerCase());

  if (matchIndex === -1) return null;

  // 2. 이제 공백이 제거된 텍스트에서의 인덱스를, 공백이 있는 원본 텍스트의 인덱스로 변환합니다.
  const mapToOriginalIndex = (spaceLessIndex: number): number => {
    let originalIdx = 0;
    let spaceLessIdx = 0;
    while (originalIdx < text.length && spaceLessIdx < spaceLessIndex) {
      if (text[originalIdx] !== " ") {
        spaceLessIdx++;
      }
      originalIdx++;
    }
    // 루프가 끝난 후에도 공백을 건너뛰어야 할 수 있으므로 추가 처리
    while (originalIdx < text.length && text[originalIdx] === " ") {
      originalIdx++;
    }
    return originalIdx;
  };

  // 3. 분해된 문자열의 시작/끝 위치를 공백 없는 원본 문자열의 인덱스로 변환합니다.
  let startSpaceLessIndex = -1;
  let endSpaceLessIndex = -1;
  let currentDecomposedLength = 0;

  const textWithoutSpaces = text.replace(/\s/g, "");
  for (let i = 0; i < textWithoutSpaces.length; i++) {
    if (startSpaceLessIndex === -1 && currentDecomposedLength >= matchIndex) {
      startSpaceLessIndex = i;
    }

    const charDecomposedLength = decomposeHangul(textWithoutSpaces[i]).length;
    if (
      endSpaceLessIndex === -1 &&
      currentDecomposedLength + charDecomposedLength >
        matchIndex + decomposedSearch.length
    ) {
      endSpaceLessIndex = i;
      break;
    }
    currentDecomposedLength += charDecomposedLength;
    if (i === textWithoutSpaces.length - 1 && endSpaceLessIndex === -1) {
      endSpaceLessIndex = i + 1;
    }
  }

  if (startSpaceLessIndex === -1) return null;

  // 4. 최종적으로 원본 텍스트의 실제 시작/끝 인덱스를 계산합니다.
  const startIndex = mapToOriginalIndex(startSpaceLessIndex);
  const endIndex = mapToOriginalIndex(endSpaceLessIndex);

  return { startIndex, endIndex };
}
