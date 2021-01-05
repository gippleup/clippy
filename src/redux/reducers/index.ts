import { combineReducers } from "redux";
import clipped from '@redux/reducers/clipped';
import query from '@redux/reducers/query';
import recentQuery from '@redux/reducers/recentQuery';
import searchResult from '@redux/reducers/searchResult';
import filter from '@redux/reducers/filter';

const rootReducer = combineReducers({
  clipped,
  query,
  recentQuery,
  searchResult,
  filter,
})

export default rootReducer;