import { createReducer } from "@reduxjs/toolkit";
import actions from '@redux/actions/theme';
import { SupportedColorTheme } from "@api/colortheme";

type ThemeState = {
  theme: SupportedColorTheme;
}

const initialState: ThemeState = {
  theme: "dark",
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.get.fulfilled, (state, action) => {
      state.theme = action.payload;
    })
    .addCase(actions.set.fulfilled, (state, action) => {
      state.theme = action.payload;
    })
    .addCase(actions.initialize.fulfilled, (state, action) => {
      state.theme = action.payload;
    })
    .addDefaultCase((state, action) => state)
});

export default reducer;