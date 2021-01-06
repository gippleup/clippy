import { createReducer } from "@reduxjs/toolkit";
import actions from '@redux/actions/clipped'
import { Clipped } from "@redux/schema/searchResult";

type ClippedState = {
  articles: Clipped[];
}

const initialState: ClippedState = {
  articles: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(actions.addTag.fulfilled, (state, action) => {
    //   state.articles = action.payload;
    // })
    // .addCase(actions.removeTag.fulfilled, (state, action) => {
    //   state.articles = action.payload;
    // })
    .addCase(actions.setClipStatus.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.clearTags.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.get.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.initialize.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.pin.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.push.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.remove.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.set.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.crossUnclip.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.pureUnclip.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
    .addCase(actions.unpin.fulfilled, (state, action) => {
      state.articles = action.payload;
    })
})

export default reducer;