import { SearchResult } from "@redux/schema/searchResult";
import { createReducer } from "@reduxjs/toolkit";
import actions from '@redux/actions/searchResult'

type SearchResultState = {
  result: SearchResult[];
}

const initialState: SearchResultState = {
  result: [],
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setClipStatus.fulfilled, (state, action) => {
      state.result = action.payload.result;
    })
    .addCase(actions.set, (state, action) => {
      state.result = action.payload;
    })
    .addCase(actions.push.fulfilled, (state, action) => {
      state.result = action.payload.result;
    })
    .addCase(actions.clip.fulfilled, (state, action) => {
      state.result = action.payload.result;
    })
    .addCase(actions.pureUnclip.fulfilled, (state, action) => {
      state.result = action.payload.result;
    })
    .addCase(actions.crossUnclip.fulfilled, (state, action) => {
      state.result = action.payload.result;
    })
})

export default reducer