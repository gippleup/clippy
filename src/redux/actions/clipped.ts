import { createAsyncThunk } from "@reduxjs/toolkit";
import localApi from "@api/local";
import { Clipped, ArticleIndicator } from "@redux/schema/searchResult";

const {clipped} = localApi;

const set = createAsyncThunk(
  'clipped/set',
  async (items: Clipped[]) => {
    await clipped.set(items);
    const updated = await clipped.get();
    return updated;
  }
);

const remove = createAsyncThunk(
  'clipped/remove',
  async (indicator: ArticleIndicator | ArticleIndicator[]) => {
    await clipped.remove(indicator);
    const updated = await clipped.get();
    return updated;
  }
);

const push = createAsyncThunk(
  'clipped/push',
  async (item: Clipped | Clipped[]) => {
    await clipped.push(item);
    const updated = await clipped.get();
    return updated;
  }
);

const initialize = createAsyncThunk(
  'clipped/initialize',
  async () => {
    await clipped.initialize();
    const updated = await clipped.get();
    return updated;
  }
);

const get = createAsyncThunk(
  'clipped/get',
  async () => {
    await clipped.get();
    const updated = await clipped.get();
    return updated;
  }
);

const clearTags = createAsyncThunk(
  'clipped/clearTags',
  async (indicator: ArticleIndicator | ArticleIndicator[]) => {
    await clipped.clearTags(indicator);
    const updated = await clipped.get();
    return updated;
  }
);

const unclip = createAsyncThunk(
  'clipped/unclip',
  async (indicator: ArticleIndicator | ArticleIndicator[]) => {
    await clipped.remove(indicator);
    const updated = await clipped.get();
    return updated;
  }
);

const addTag = createAsyncThunk(
  'clipped/addTag',
  async (indicator: ArticleIndicator | ArticleIndicator[]) => {
    await clipped.addTag(indicator);
    const updated = await clipped.get();
    return updated;
  }
);

const removeTag = createAsyncThunk(
  'clipped/removeTag',
  async (indicator: ArticleIndicator | ArticleIndicator[]) => {
    await clipped.removeTag(indicator);
    const updated = await clipped.get();
    return updated;
  }
);

const pin = createAsyncThunk(
  'clipped/pin',
  async (indicator: ArticleIndicator | ArticleIndicator[]) => {
    await clipped.pin(indicator);
    const updated = await clipped.get();
    return updated;
  }
)

const unpin = createAsyncThunk(
  'clipped/unpin',
  async (indicator: ArticleIndicator | ArticleIndicator[]) => {
    await clipped.unpin(indicator);
    const updated = await clipped.get();
    return updated;
  }
);

export default {
  set,
  remove,
  initialize,
  unclip,
  addTag,
  removeTag,
  pin,
  unpin,
  push,
  get,
  clearTags,
}