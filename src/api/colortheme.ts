import dark from './colortheme/dark'
import light from './colortheme/light'

const ColorPack = {
  dark,
  light,
}

export const ColorThems = Object.keys(ColorPack);
export type SupportedColorTheme = keyof typeof ColorPack;

export const getColorTheme = (theme: keyof typeof ColorPack) => ColorPack[theme];
export const getAllColors = () => ColorPack;
