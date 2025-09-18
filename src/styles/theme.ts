import type { Theme, ThemeName } from '@/types/theme';

import { palette } from './palette';

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
  },
};
