import { createAsyncThunk } from "@reduxjs/toolkit";
import localApi from "src/api/local";

const {recentQuery} = localApi;
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
  async (id: number, thunkAPI) => {
    await recentQuery.remove(id);
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
  get,
  push,
  remove,
  clear,
}