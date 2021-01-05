import getColorTheme from "@api/colortheme";
import ColorTheme from "@api/colortheme/schema";
import { createReducer } from "@reduxjs/toolkit";

const initialState: ColorTheme = getColorTheme("dark");
const reducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state, action) => state)
});

export default reducer;