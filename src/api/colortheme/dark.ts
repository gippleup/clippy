import { createColorTheme } from "./schema";
import chroma from 'chroma-js';

const colortheme = createColorTheme({
  primary: "orange",
  secondary: "royalblue",
  background: chroma("black").set("hsl.l", 0.05).hex(),
  surface: "black",
  error: "tomato",
})

export default colortheme;