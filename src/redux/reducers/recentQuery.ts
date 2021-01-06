import { createReducer } from "@reduxjs/toolkit"
import actions from '@redux/actions/recentQuery'

type RecentQueryState = {
  queries: string[];
  visible: boolean;
}

const initialState: RecentQueryState = {
  queries: [],
  visible: false,
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.remove.fulfilled, (state, action) => {
      state.queries = action.payload;
    })
    .addCase(actions.push.fulfilled, (state, action) => {
      state.queries = action.payload;
    })
    .addCase(actions.clear.fulfilled, (state, action) => {
      state.queries = [];
    })
    .addCase(actions.get.fulfilled, (state, action) => {
      state.queries = action.payload;
    })
    .addCase(actions.setVisiblity, (state, action) => {
      state.visible = action.payload;
    })
})

export default reducer;