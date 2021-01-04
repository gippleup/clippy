import { SearchResult } from "@redux/schema/searchResult";
import { createReducer } from "@reduxjs/toolkit";

type SearchResultState = {
  result: SearchResult[];
}

const initialState: SearchResultState = {
  result: [],
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addDefaultCase((state, action) => {
      return state;
    })
})

export default reducer