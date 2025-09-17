import { palette } from "./palette";

export type ThemeName = "light" | "dark";

export interface Theme {
  background: string; // 페이지 배경 (gradient 허용)
  text: string; // 기본 텍스트
  componentBg: string; // 카드/섹션 배경
  border: string; // 카드/입력 보더
  buttonBg: string; // 버튼 배경 (단색 유지: 일부 컴포넌트에서 backgroundColor 사용)
  buttonText: string; // 버튼 텍스트
  inputBg: string; // 인풋 배경
  hoverBg: string; // 카드/리스트 hover 배경
  errorBg: string; // 에러 박스 배경
  errorText: string; // 에러 텍스트
}

// ✨ 아주 얇은 보더 느낌을 주는 반투명 보더
const hairline = "rgba(2, 6, 23, 0.06)"; // slate-950 @ 6%
const hairlineDark = "rgba(148, 163, 184, .14)"; // slate-400 @ 14%

export const themes: Record<ThemeName, Theme> = {
  light: {
    // 배경은 미세한 그라디언트로 깊이감
    background: `linear-gradient(180deg, ${palette.lightBackground} 0%, #ffffff 100%)`,
    text: palette.black,
    componentBg: palette.white,
    border: hairline, // 은은한 경계
    // 버튼은 퍼플 톤(시그니처) 유지
    buttonBg: palette.purple,
    buttonText: palette.white,
    inputBg: palette.white,
    hoverBg: palette.lightGray, // 살짝 들어오는 hover
    errorBg: palette.lightRed,
    errorText: palette.red,
  },
  dark: {
    // 다크는 네이비→그레이로 그라디언트
    background: `linear-gradient(180deg, ${palette.darkBackground} 0%, #111827 100%)`,
    text: "#e5e7eb", // slate-200
    componentBg: "#111827", // gray-900 느낌
    border: hairlineDark,
    // 다크에서 버튼은 인디고로 살짝 더 선명하게
    buttonBg: palette.blue,
    buttonText: palette.white,
    inputBg: "#0f172a", // slate-900
    hoverBg: "#0f172a",
    errorBg: "#1f2937", // deep gray
    errorText: palette.pink,
  },
};
