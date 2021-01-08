import { createReducer } from "@reduxjs/toolkit";
import actions from '@redux/actions/query';

export type QueryStateStatus = "pending" | "rejected" | "idle";

type QueryState = {
  value: string;
  page: number;
  status: QueryStateStatus;
  refreshing: boolean;
  prevValue: string;
  typing: boolean;
}

const initialState: QueryState = {
  value: "",
  page: 0,
  status: "idle",
  refreshing: false,
  prevValue: "",
  typing: false,
};

const queryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setTyping, (state, action) => {
      state.typing = action.payload;
    })
    .addCase(actions.search.fulfilled, (state, action) => {
      state.prevValue = state.value;
      state.status = "idle";
    })
    .addCase(actions.search.rejected, (state, action) => {
      state.status = "rejected";
    })
    .addCase(actions.search.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(actions.setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(actions.setPage, (state, action) => {
      state.page = action.payload;
    })
    .addCase(actions.set, (state, action) => {
      state.value = action.payload;
    })
    .addCase(actions.clear, (state) => {
      state.value = "";
    })
    .addCase(actions.setRefresing, (state, action) => {
      state.refreshing = action.payload;
    })
    .addDefaultCase((state, action) => {
      return state;
    })
})

export default queryReducer;