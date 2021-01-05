import newsApi, { REGISTERED_PUBLISHERS } from "@api/news";
import { ArticleSearchOption } from "@api/news/nyTimes";
import { ReduxRootState } from "@redux/schema";
import { RegisteredPublisher } from "@redux/schema/publishers";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { mapToArray } from "@utils/array";
import { isIndicated } from "@utils/searchResult";

const setSort = createAction<ArticleSearchOption["sort"]>('filter/setSort')

const addPublisher = createAsyncThunk(
  'filter/addPublisher',
  (publisher: RegisteredPublisher | RegisteredPublisher[], thunkAPI) => {
    const state = thunkAPI.getState() as ReduxRootState;
    const publishers = mapToArray(publisher);
    const hasNotAdded = (pub: RegisteredPublisher) => state.filter.publisher.indexOf(pub) === -1
    const filtered = publishers.filter(hasNotAdded);
    const concat = state.filter.publisher.concat(filtered);
    const updated = {publisher: concat};
    return updated;
  }
);

const removePublisher = createAsyncThunk(
  'filter/removePublisher',
  (publisher: RegisteredPublisher | RegisteredPublisher[], thunkAPI) => {
    const state = thunkAPI.getState() as ReduxRootState;
    const publishers = mapToArray(publisher);
    const isIndicated = (pub: RegisteredPublisher) => publishers.indexOf(pub) === -1
    const filtered = state.filter.publisher.filter(isIndicated);
    const updated = {publisher: filtered};
    return updated;
  }
);

const selectAllPublisher = createAsyncThunk(
  'filter/selectAllPublisher',
  async (arg: undefined, thunkAPI) => {
    await thunkAPI.dispatch(addPublisher(REGISTERED_PUBLISHERS));
    const state = thunkAPI.getState() as ReduxRootState;
    return state.filter;
  }
);

const removeAllPublisher = createAsyncThunk(
  'filter/removeAllPublisher',
  async (arg: undefined, thunkAPI) => {
    await thunkAPI.dispatch(removePublisher(REGISTERED_PUBLISHERS));
    const state = thunkAPI.getState() as ReduxRootState;
    return state.filter;
  }
)

export default {
  addPublisher,
  removePublisher,
  selectAllPublisher,
  removeAllPublisher,
  setSort,
}