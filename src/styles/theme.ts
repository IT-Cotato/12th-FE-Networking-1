// src/styles/theme.ts
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
  cardhoverBg: string;
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

    cardhoverBg: palette.white,
  },
  dark: {
    background: palette.darkBackground,
    text: palette.white,
    componentBg: palette.deepGray,
    border: palette.darkGray,
    buttonBg: palette.gold,
    buttonText: palette.black,
    inputBg: palette.darkGray,
    hoverBg: palette.darkGray,
    errorBg: palette.deepGray,
    errorText: palette.pink,

    cardhoverBg: palette.deepGray,
  },
};
