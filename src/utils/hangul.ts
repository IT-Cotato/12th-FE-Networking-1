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
  // 입력된 문자열을 한 글자씩 순회합니다.
  for (const char of str) {
    const code = char.charCodeAt(0);
    // 현재 글자의 유니코드 값이 한글 범위('가' ~ '힣')에 있는지 확인합니다.
    if (code >= 0xac00 && code <= 0xd7a3) {
      // 한글 유니코드 계산을 위해 시작점('가')과의 거리(index)를 구합니다.
      const index = code - 0xac00;
      // 수학 공식을 이용해 초성, 중성, 종성의 인덱스를 각각 계산합니다.
      // (전체 인덱스를 588(21*28)로 나눈 몫이 초성 인덱스)
      const cho = Math.floor(index / 588);
      // (전체 인덱스를 588로 나눈 나머지를 28로 나눈 몫이 중성 인덱스)
      const jung = Math.floor((index % 588) / 28);
      // (전체 인덱스를 28로 나눈 나머지가 종성 인덱스)
      const jong = index % 28;

      // 계산된 인덱스를 이용해 CHO, JUNG 배열에서 실제 자음/모음을 찾아 결과에 추가합니다.
      result += CHO[cho] + JUNG[jung];
      // 종성(받침)은 없는 글자도 있으므로, 종성 인덱스가 0보다 클 때만 추가합니다.
      if (jong > 0) result += JONG[jong];
    } else {
      // 한글이 아닌 경우(영어, 숫자, 공백 등)는 원본 글자를 그대로 결과에 추가합니다.
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
export function createHangulHighlighterRegex(search: string): RegExp {
  // 1. 검색어의 양쪽 공백과 내부 공백을 모두 제거합니다.
  const cleanSearch = search.trim().replace(/\s/g, "");
  if (!cleanSearch) return new RegExp("a^", "g"); // 빈 검색어는 아무것도 찾지 않는 정규식 반환

  // 2. 정리된 검색어를 자소 단위로 분해합니다. (예: '좀ㅂ' -> 'ㅈㅗㅁㅂ')
  const decomposed = decomposeHangul(cleanSearch);
  let pattern = "";
  let i = 0; // 분해된 검색어의 인덱스

  // 3. 분해된 검색어를 순회하며 정규식 패턴을 조합합니다.
  while (i < decomposed.length) {
    const cho = decomposed[i]; // 현재 처리할 초성
    const choIndex = CHO.indexOf(cho);

    if (choIndex === -1) {
      // 3-1. 현재 문자가 초성 리스트에 없으면(영어, 숫자 등), 특수문자를 이스케이프 처리하여 패턴에 추가합니다.
      pattern += cho.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      i++;
    } else {
      // 3-2. 현재 문자가 초성일 경우, 다음 글자가 중성인지 확인하여 음절 조합을 시작합니다.
      const jung = i + 1 < decomposed.length ? decomposed[i + 1] : null;
      const jungIndex = jung ? JUNG.indexOf(jung) : -1;

      if (jungIndex === -1) {
        // 3-2-A. 초성만 단독으로 있는 경우 (예: '좀ㅂ' 에서의 'ㅂ' 또는 'ㄱ' 단독 검색)
        // 해당 자음으로 시작하는 모든 한글의 유니코드 범위를 패턴으로 만듭니다. (예: [ㄱ가-깋])
        const start = String.fromCharCode(0xac00 + choIndex * 588);
        const end = String.fromCharCode(start.charCodeAt(0) + 587);
        pattern += `[${cho}${start}-${end}]`;
        i++;
      } else {
        // 3-2-B. 초성 + 중성이 결합되는 경우
        const jong = i + 2 < decomposed.length ? decomposed[i + 2] : null;
        const jongIndex = jong ? JONG.indexOf(jong) : -1;

        if (jongIndex === -1 || jongIndex === 0) {
          // 받침이 없는 글자 (예: '조', '비'). '조'로 시작하는 모든 글자('조', '족', '존'...)를 찾도록
          // 유니코드 범위를 패턴으로 만듭니다. (예: [조-좣])
          const startCode = 0xac00 + choIndex * 588 + jungIndex * 28;
          const start = String.fromCharCode(startCode);
          const end = String.fromCharCode(startCode + JONG.length - 1);
          pattern += `[${start}-${end}]`;
          i += 2; // 초성, 중성을 처리했으므로 인덱스를 2칸 이동
        } else {
          // 받침까지 완성된 글자 (예: '좀', '딸'). 정확히 해당 글자만 찾도록 패턴을 만듭니다.
          const charCode = 0xac00 + choIndex * 588 + jungIndex * 28 + jongIndex;
          pattern += String.fromCharCode(charCode);
          i += 3; // 초성, 중성, 종성을 처리했으므로 인덱스를 3칸 이동
        }
      }
    }
    // 각 패턴 유닛(글자) 사이에 공백이 0개 이상 들어갈 수 있도록 '\\s*'를 추가합니다. (띄어쓰기 무시)
    pattern += "\\s*";
  }

  try {
    // 4. 완성된 패턴의 마지막에 붙은 불필요한 '\\s*'를 제거하고, 정규식 객체를 생성하여 반환합니다.
    // 'g'는 전역 검색, 'i'는 대소문자 무시 옵션입니다.
    return new RegExp(`(${pattern.slice(0, -3)})`, "gi");
  } catch (e) {
    // 5. 혹시라도 잘못된 패턴으로 에러가 발생하면, 안전하게 일반 텍스트 검색으로 대체합니다.
    return new RegExp(
      `(${cleanSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
  }
}
