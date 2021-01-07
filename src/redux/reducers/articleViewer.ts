import { createReducer } from "@reduxjs/toolkit"
import actions from '@redux/actions/articleViewer'

export type ArticleViewerState = {
  url: string;
  status: "pending" | "idle";
}

const initialState: ArticleViewerState = {
  url: "https://bit.ly/38lb5pJ",
  status: "idle",
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(actions.setUrl, (state, action) => {
      state.url = action.payload;
    })
})

export default reducer;