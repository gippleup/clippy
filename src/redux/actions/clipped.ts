import { AsyncThunkPayloadCreator, createAsyncThunk } from "@reduxjs/toolkit";
import localApi from "@api/local";
import { Clipped, ArticleIndicator, SearchResult } from "@redux/schema/searchResult";
import { ReduxRootState } from "@redux/schema";
import { isIndicated } from "@utils/searchResult";
import { mapToArray } from "@utils/array";
import searchResult from "./searchResult";

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
    const mapped: Clipped[] = mapToArray(item).map((item) => ({...item, clipStatus: "idle"}));
    await clipped.push(mapped);
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

type UnclipAsyncThunkPayloadCreator = AsyncThunkPayloadCreator<
  Clipped[], ArticleIndicator | ArticleIndicator[], {}
>;

const baseUnclipLogic: UnclipAsyncThunkPayloadCreator = async (indicator, thunkAPI) => {
  await thunkAPI.dispatch(setClipStatus({indicator, status: "pending"}));
  await thunkAPI.dispatch(remove(indicator));
  const updated = await clipped.get();
  await thunkAPI.dispatch(setClipStatus({indicator, status: "idle"}));
  return updated;
}

const pureUnclip = createAsyncThunk('clipped/pureUnclip', baseUnclipLogic);
const crossUnclip = createAsyncThunk(
  'clipped/crossUnclip',
  async (indicator: ArticleIndicator | ArticleIndicator[], thunkAPI) => {
    await thunkAPI.dispatch(searchResult.pureUnclip(indicator))
    return baseUnclipLogic(indicator, thunkAPI);
  }
);


// TODO: tag should be handled on seperate reducer. create reducer for handling tag input first.
// const addTag = createAsyncThunk(
//   'clipped/addTag',
//   async (indicator: ArticleIndicator | ArticleIndicator[]) => {
//     await clipped.addTag(indicator);
//     const updated = await clipped.get();
//     return updated;
//   }
// );

// const removeTag = createAsyncThunk(
//   'clipped/removeTag',
//   async (indicator: ArticleIndicator | ArticleIndicator[]) => {
//     await clipped.removeTag(indicator);
//     const updated = await clipped.get();
//     return updated;
//   }
// );

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

const togglePin = createAsyncThunk(
  'clipped/togglePin',
  async (indicator: ArticleIndicator, thunkAPI) => {
    const state = thunkAPI.getState() as ReduxRootState;
    const toggleTarget = state.clipped.articles.find((item) => isIndicated([indicator], item));
    if (!toggleTarget) return;
    const relevantAction = toggleTarget.pinned ? unpin(indicator) : pin(indicator);
    await thunkAPI.dispatch(relevantAction);    
  }
)

const setClipStatus = createAsyncThunk(
  'clipped/setClipStatus',
  async(args: {
    indicator: ArticleIndicator | ArticleIndicator[],
    status: SearchResult["clipStatus"],
  }, thunkAPI) => {
    const state = thunkAPI.getState() as ReduxRootState;
    const {indicator, status} = args;
    const mapped = state.clipped.articles.map((item) => {
      if (!isIndicated(indicator, item)) return item;
      return {
        ...item,
        clipStatus: status,
      }
    });
    return mapped;
  }
)

export default {
  set,
  remove,
  initialize,
  crossUnclip,
  // addTag,
  // removeTag,
  pin,
  unpin,
  push,
  get,
  clearTags,
  togglePin,
  setClipStatus,
  pureUnclip,
}