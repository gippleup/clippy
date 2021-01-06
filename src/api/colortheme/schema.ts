type ColorTheme = {
  primary: string;
  secondary: string;
  surface: string;
  background: string;
  error: string;
}

const defaultSurfaceColor = "white";
const defaultBackgroundColor = "white";
const defaultErrorColor = "tomato";
const defaultValues = {
  surface: defaultSurfaceColor,
  background: defaultBackgroundColor,
  error: defaultErrorColor,
}

type CreateColorThemeOption = Pick<ColorTheme, "primary" | "secondary"> & Partial<ColorTheme>;
export const createColorTheme = (option: CreateColorThemeOption): ColorTheme => ({...defaultValues, ...option})

export default ColorTheme;