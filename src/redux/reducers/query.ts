import { createReducer } from "@reduxjs/toolkit";
import actions from '@redux/actions/query';

type QueryState = {
  value: string;
}
const initialState: QueryState = {
  value: "",
};
const queryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.set, (state, action) => {
      state.value = action.payload;
    })
    .addCase(actions.clear, (state) => {
      state.value = "";
    })
})

export default queryReducer;