import { ReduxRootState } from "@redux/schema";
import { combineReducers } from "redux";
import clipped from '@redux/reducers/clipped';
import query from '@redux/reducers/query';
import recentQuery from '@redux/reducers/recentQuery';
import searchResult from '@redux/reducers/searchResult';

const rootReducer = combineReducers({
  clipped,
  query,
  recentQuery,
  searchResult,
})

export default rootReducer;