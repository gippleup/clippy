import newsApi from "@api/news";
import { ReduxRootState } from "@redux/schema";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import searchRestulActions from './searchResult';
import recentQueryActions from './recentQuery';
import { QueryStateStatus } from "@redux/reducers/query";
import { ArticleSearchOption } from "@api/news/nyTimes";

const set = createAction<string>('query/set');
const clear = createAction<undefined>('query/clear');
const setPage = createAction<number>('query/setPage');
const setTyping = createAction<boolean>('query/setTyping');
const setRefresing = createAction<boolean>('query/setRefreshing');
const setStatus = createAction<QueryStateStatus>('query/setStatus');

const fetchSet = createAsyncThunk(
  'query/fetchSet',
  async (option: ArticleSearchOption, thunkAPI) => {
    thunkAPI.dispatch(recentQueryActions.setVisiblity(false));
    const searchResults = await newsApi.nyTimes.fetchArticles(option);
    await thunkAPI.dispatch(searchRestulActions.set(searchResults));
  }
)

const fetchPush = createAsyncThunk(
  'query/fetchPush',
  async (option: ArticleSearchOption, thunkAPI) => {
    thunkAPI.dispatch(recentQueryActions.setVisiblity(false));
    const searchResults = await newsApi.nyTimes.fetchArticles(option);
    await thunkAPI.dispatch(searchRestulActions.push(searchResults));
  }
)

const search = createAsyncThunk(
  'query/search',
  async (arg: undefined, thunkAPI) => {
    thunkAPI.dispatch(recentQueryActions.setVisiblity(false));
    const state = thunkAPI.getState() as ReduxRootState;
    const {page, value, prevValue} = state.query;
    const {sort} = state.filter;
    const searchResults = await newsApi.nyTimes.fetchArticles({
      q: value,
      begin_date: undefined,
      end_date: undefined,
      page,
      signal: thunkAPI.signal,
      sort: sort,
    });
    if (prevValue === value) {
      await thunkAPI.dispatch(searchRestulActions.push(searchResults));
    } else {
      await thunkAPI.dispatch(searchRestulActions.set(searchResults));
      await thunkAPI.dispatch(recentQueryActions.push(value));
    }
  }
)

const fetchNextPage = createAsyncThunk(
  'query/fetchNextPage',
  async (args: undefined, thunkAPI) => {
    const state = thunkAPI.getState() as ReduxRootState;
    const {page: prevPage} = state.query;
    thunkAPI.dispatch(setPage(prevPage + 1));
    await thunkAPI.dispatch(search())
  }
)

const refresh = createAsyncThunk(
  'query/refresh',
  async (args: undefined, thunkAPI) => {
    thunkAPI.dispatch(setRefresing(true));
    const state = thunkAPI.getState() as ReduxRootState;
    const {sort} = state.filter;
    const {value: q} = state.query;
    await thunkAPI.dispatch(fetchSet({
      q,
      page: 0,
      sort,
    }));
    thunkAPI.dispatch(setRefresing(false));
  }
)


export default {
  set,
  clear,
  setPage,
  setStatus,
  fetchSet,
  fetchPush,
  fetchNextPage,
  refresh,
  setRefresing,
  search,
  setTyping,
}