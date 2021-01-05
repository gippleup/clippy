import dark from './colortheme/dark'

const ColorPack = {
  dark,
}

const getColorTheme = (theme: keyof typeof ColorPack) => ColorPack[theme];

export default getColorTheme