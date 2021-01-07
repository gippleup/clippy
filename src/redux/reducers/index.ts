import { combineReducers } from "redux";
import clipped from '@redux/reducers/clipped';
import query from '@redux/reducers/query';
import recentQuery from '@redux/reducers/recentQuery';
import searchResult from '@redux/reducers/searchResult';
import filter from '@redux/reducers/filter';
import theme from '@redux/reducers/theme';
import articleViewer from '@redux/reducers/articleViewer';

const rootReducer = combineReducers({
  clipped,
  query,
  recentQuery,
  searchResult,
  filter,
  theme,
  articleViewer,
})

export default rootReducer;