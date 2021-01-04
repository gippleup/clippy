import { createReducer } from "@reduxjs/toolkit"

type RecentQueryState = {
  value: string[];
}

const initialState: RecentQueryState = {
  value: [],
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addDefaultCase((state, action) => {
      return {...state, value: action.payload};
    })
})

export default reducer;