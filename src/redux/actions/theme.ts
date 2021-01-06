import { SupportedColorTheme } from "@api/colortheme";
import localApi from "@api/local";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
const {colortheme} = localApi;

const set = createAsyncThunk(
  'colortheme/set',
  async (theme: SupportedColorTheme, thunkAPI) => {
    await colortheme.set(theme);
    const updated = await colortheme.get();
    return updated;
  }
)

const get = createAsyncThunk(
  'colortheme/get',
  async (_: undefined, thunkAPI) => {
    const theme = await colortheme.get();
    return theme;
  }
)

const initialize = createAsyncThunk(
  'colortheme/initialize',
  async (_: undefined, thunkAPI) => {
    await colortheme.initialize();
    const updated = await colortheme.get();
    return updated;
  }
)

export default {
  get,
  set,
  initialize,
}