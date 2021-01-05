import { createReducer } from "@reduxjs/toolkit"
import actions from '@redux/actions/recentQuery'

type RecentQueryState = {
  value: string[];
}

const initialState: RecentQueryState = {
  value: [],
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.remove.fulfilled, (state, action) => {
      state.value = action.payload;
    })
    .addCase(actions.push.fulfilled, (state, action) => {
      state.value = action.payload;
    })
    .addCase(actions.clear.fulfilled, (state, action) => {
      state.value = [];
    })
    .addCase(actions.get.fulfilled, (state, action) => {
      state.value = action.payload;
    })
})

export default reducer;