import { AsyncThunkPayloadCreator, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import clippedActions from '@redux/actions/clipped';
import { ReduxRootState } from "@redux/schema";
import { converToClipped, getIndicatorIndex, isIndicated } from "@utils/searchResult";
import { ArticleIndicator, SearchResult } from "@redux/schema/searchResult";

const set = createAction<SearchResult[]>('searchResult/set');
const push = createAsyncThunk(
  'searchResult/push',
  async (results: SearchResult[], thunkAPI) => {
    const state = thunkAPI.getState() as ReduxRootState;
    const prevResult = state.searchResult.result;
    const filtered = results.filter((article) => !isIndicated(prevResult, article));
    const concat = prevResult.concat(filtered);
    const updated = {result: concat}
    return updated;
  }
);

type UnclipAsyncThunkPayloadCreator = AsyncThunkPayloadCreator<
  {result: SearchResult[]}, ArticleIndicator | ArticleIndicator[], {}
>;

const baseUnclipLogic: UnclipAsyncThunkPayloadCreator = async (indicator, thunkAPI) => {
  const state = thunkAPI.getState() as ReduxRootState;
  const mappedResult = state.searchResult.result.map((item) => {
    if (!isIndicated(indicator, item)) return item;
    return {...item, clipped: false};
  })
  const updated = {result: mappedResult}
  return updated;
}

const pureUnclip = createAsyncThunk('searchResult/pureUnclip', baseUnclipLogic)
const crossUnclip = createAsyncThunk(
  'searchResult/crossUnclip',
  async (indicator: ArticleIndicator | ArticleIndicator[], thunkAPI) => {
    await thunkAPI.dispatch(clippedActions.pureUnclip(indicator));
    return baseUnclipLogic(indicator, thunkAPI);
  }
)

const clip = createAsyncThunk(
  'searchResult/clip',
  async (indicator: ArticleIndicator | ArticleIndicator[], thunkAPI) => {
    const state = thunkAPI.getState() as ReduxRootState;
    const mappedResult = state.searchResult.result.map((item) => {
    const indicatorIndex = getIndicatorIndex(indicator, item);
      if (indicatorIndex === -1) return item;
      return {...item, clipped: true};
    })
    const clipTargets = state.searchResult.result.filter((item) => isIndicated(indicator, item));
    if (clipTargets.length === 0) return state.searchResult;
    const mappedTargets = clipTargets.map((item) => converToClipped(item))
    await thunkAPI.dispatch(clippedActions.push(mappedTargets));
    const updated = {result: mappedResult}
    return updated;
  }
)

const toggleClip = createAsyncThunk(
  'searchResult/toggleClip',
  async (indicator: ArticleIndicator, thunkAPI) => {
    await thunkAPI.dispatch(setClipStatus({indicator, status: "pending"}))
    const state = thunkAPI.getState() as ReduxRootState;
    const toggleTarget = state.searchResult.result.find((item) => isIndicated([indicator], item));
    if (toggleTarget === undefined) return;
    const relavantAction = toggleTarget.clipped ? crossUnclip(indicator) : clip(indicator);
    await thunkAPI.dispatch(relavantAction);
    await thunkAPI.dispatch(setClipStatus({indicator, status: "idle"}));
  }
)

const setClipStatus = createAsyncThunk(
  'searchResult/setClipStatus',
  async(args: {
    indicator: ArticleIndicator | ArticleIndicator[],
    status: SearchResult["clipStatus"],
  }, thunkAPI) => {
    const {indicator, status} = args;
    const state = thunkAPI.getState() as ReduxRootState;
    const mapped = state.searchResult.result.map((item) => {
      if (!isIndicated(indicator, item)) return item;
      return {
        ...item,
        clipStatus: status,
      }
    });
    const updated = {result: mapped}
    return updated;
  }
)

export default {
  set,
  push,
  clip,
  pureUnclip,
  toggleClip,
  setClipStatus,
  crossUnclip,
}