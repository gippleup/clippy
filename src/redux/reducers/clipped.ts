import { createReducer } from "@reduxjs/toolkit";
import { Clipped } from "src/api/local/schema";

type ClippedState = {
  articles: Clipped[];
}

const initialState: ClippedState = {
  articles: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addDefaultCase((state, action) => {
      return {...state, articles: action.payload}
    })
})

export default reducer;