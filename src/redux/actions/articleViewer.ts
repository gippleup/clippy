import { ArticleViewerState } from "@redux/reducers/articleViewer";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

const setUrl = createAction<string>('articleViwer/setUrl');
const setStatus = createAction<ArticleViewerState["status"]>('articleViewer/setStatus');
const load = createAsyncThunk(
  'articleViwer/load',
  async (url: string, thunkAPI) => {
    console.log(url);
    thunkAPI.dispatch(setUrl(url));
    thunkAPI.dispatch(setStatus("pending"));
  }
);

export default {
  setUrl,
  setStatus,
  load,
}