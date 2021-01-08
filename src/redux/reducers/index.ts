import { combineReducers } from "redux";
import query from '@redux/reducers/query';
import theme from '@redux/reducers/theme';
import filter from '@redux/reducers/filter';
import clipped from '@redux/reducers/clipped';
import recentQuery from '@redux/reducers/recentQuery';
import searchResult from '@redux/reducers/searchResult';
import articleViewer from '@redux/reducers/articleViewer';

const rootReducer = combineReducers({
  articleViewer,
  clipped,
  filter,
  query,
  recentQuery,
  searchResult,
  theme,
})

export default rootReducer;