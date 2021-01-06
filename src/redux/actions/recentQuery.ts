import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import localApi from "@api/local";

const {recentQuery} = localApi;
const setVisiblity = createAction<boolean>('recentQeury/setVisibility');

const get = createAsyncThunk(
  'recentQuery/get',
  async () => {
    return recentQuery.get();
  }
)

const push = createAsyncThunk(
  'recentQuery/push',
  async (query: string, thunkAPI) => {
    await recentQuery.push(query);
    return recentQuery.get();
  }
)

const remove = createAsyncThunk(
  'recentQuery/remove',
  async (query: string, thunkAPI) => {
    await recentQuery.remove(query);
    return recentQuery.get();
  }
)

const clear = createAsyncThunk(
  'recentQuery/clear',
  async () => {
    await recentQuery.initialize();
    return recentQuery.get();
    ;
  }
)

export default {
  setVisiblity,
  get,
  push,
  remove,
  clear,
}