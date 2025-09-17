import { palette } from "./palette";

export type ThemeName = "light" | "dark";

export interface Theme {
  background: string;
  text: string;
  componentBg: string;
  border: string;
  buttonBg: string;
  buttonText: string;
  inputBg: string;
  hoverBg: string;
  errorBg: string;
  errorText: string;
  accent: string;
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    background: palette.lightBackground,
    text: palette.black,
    componentBg: palette.white,
    border: palette.gray,
    buttonBg: palette.purple,
    buttonText: palette.white,
    inputBg: palette.white,
    hoverBg: palette.lightGray,
    errorBg: palette.lightRed,
    errorText: palette.red,
    accent: palette.purple, 
  },
  dark: {
    background: palette.darkBackground,
    text: palette.white,
    componentBg: palette.deepGray,
    border: palette.darkGray,
    buttonBg: palette.purple,
    buttonText: palette.white,
    inputBg: palette.darkGray,
    hoverBg: palette.darkGray,
    errorBg: palette.deepGray,
    errorText: palette.pink,
    accent: palette.purple, 
  },
};
