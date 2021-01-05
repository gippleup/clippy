import newsApi from "@api/news";
import { ReduxRootState } from "@redux/schema";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import searchRestulActions from './searchResult';
import recentQueryActions from './recentQuery';
import { QueryStateStatus } from "@redux/reducers/query";

const set = createAction<string>('query/set');
const setStatus = createAction<QueryStateStatus>('query/setStatus');
const clear = createAction<undefined>('query/clear');
const setPage = createAction<number>('query/setPage');

const search = createAsyncThunk(
  'query/search',
  async (q: string, thunkAPI) => {
    thunkAPI.dispatch(set(q));
    const state = thunkAPI.getState() as ReduxRootState;
    const {page} = state.query;
    const {sort} = state.filter;
    const res = await newsApi.nyTimes.fetchArticles({
      q,
      begin_date: undefined,
      end_date: undefined,
      page,
      signal: thunkAPI.signal,
      sort: sort,
    });
    const mapped = newsApi.nyTimes.mapResponseToSearchResult(res);
    await thunkAPI.dispatch(searchRestulActions.push(mapped));
    await thunkAPI.dispatch(recentQueryActions.push(q));
  }
)

const fetchNextPage = createAsyncThunk(
  'query/fetchNextPage',
  async (args: undefined, thunkAPI) => {
    const state = thunkAPI.getState() as ReduxRootState;
    const {page: prevPage, value: q} = state.query;
    thunkAPI.dispatch(setPage(prevPage + 1));
    await thunkAPI.dispatch(search(q))
  }
)

export default {
  set,
  clear,
  setPage,
  setStatus,
  fetchNextPage,
  search,
}