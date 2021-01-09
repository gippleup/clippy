import { createColorTheme } from "./schema";
import chroma from 'chroma-js';

const colortheme = createColorTheme({
  ABSTRACT: "lightgrey",
  ARTICLE_HEADER_CLIPPED: "royalblue",
  ARTICLE_HEADER_NOT_CLIPPED: "firebrick",
  BACKGROUNDCOVER_CLIPPED: "rgba(0,0,0,0.8)",
  BACKGROUNDCOVER_NOT_CLIPPED: "rgba(0,0,0,0.7)",
  CLIPBUTTON_CLIPPED_BACKGROUND: "royalblue",
  CLIPBUTTON_CLIPPED_TEXT: "lightgrey",
  CLIPBUTTON_NOT_CLIPPED_BACKGROUND: "firebrick",
  CLIPBUTTON_NOT_CLIPPED_TEXT: "lightgrey",
  LOADINGARTICLE_BACKGROUND: "rgb(20,20,20)",
  LOADINGARTICLE_CIRCLE: "lightgrey",
  LOADINGRESULT_BACKGROUND: "black",
  LOADINGRESULT_CIRCLE: "black",
  NOCLIPPED_BACKGROUND: chroma("royalblue").alpha(0.2).hex(),
  NOCLIPPED_TEXT: "lightgrey",
  NORESULT_BACKGROUND: chroma("magenta").darken().alpha(0.2).hex(),
  NORESULT_TEXT: "lightgrey",
  PAGE_CONTAINER: "rgb(20,20,20)",
  PAGE_HEADER_CLIPPED: "royalblue",
  PAGE_HEADER_NOT_CLIPPED: "firebrick",
  PUB_DATE: "white",
  RECENTQUERY_BACKGROUND: "rgb(50,50,50)",
  RECENTQUERY_BORDER: "grey",
  RECENTQUERY_DELETE: "lightgrey",
  RECENTQUERY_DELETE_BACKGROUND: "midnightblue",
  RECENTQUERY_DELETE_BORDER: "dodgerblue",
  RECENTQUERY_TEXT: "lightgrey",
  SEARCHBAR_BACKGROUND: "rgb(50,50,50)",
  SEARCHBAR_BORDER: "grey",
  SEARCHBAR_PLACEHOLDER: "white",
  SEARCHBAR_TEXT: "lightgrey",
  SEARCHBUTTON_BACKGROUND: "firebrick",
  SEARCHBUTTON_ICON: "lightgrey",
  TAB_BACKGROUND: "rgb(20,20,20)",
  TAB_INDICATOR: "royalblue",
  TAB_TEXT: "white",
  THEMETOGGLER_BACKGROUND: chroma("grey").darken().hex(),
})

export default colortheme;