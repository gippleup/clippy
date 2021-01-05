import { combineReducers } from "redux";
import clipped from '@redux/reducers/clipped';
import query from '@redux/reducers/query';
import recentQuery from '@redux/reducers/recentQuery';
import searchResult from '@redux/reducers/searchResult';
import filter from '@redux/reducers/filter';
import theme from '@redux/reducers/theme';

const rootReducer = combineReducers({
  clipped,
  query,
  recentQuery,
  searchResult,
  filter,
  theme,
})

export default rootReducer;