type ColorTheme = {
  primary: string;
  secondary: string;
  surface?: string;
  background?: string;
  error?: string;
}

const defaultSurfaceColor = "white";
const defaultBackgroundColor = "white";
const defaultErrorColor = "tomato";
const defaultValues = {
  surface: defaultSurfaceColor,
  background: defaultBackgroundColor,
  error: defaultErrorColor,
}

export const createColorTheme = (option: ColorTheme) => ({...defaultValues, ...option})

export default ColorTheme;