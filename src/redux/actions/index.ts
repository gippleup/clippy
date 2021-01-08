import articleViewer from './articleViewer';
import clipped from './clipped';
import filter from './filter';
import query from './query';
import recentQuery from './recentQuery';
import searchResult from './searchResult';
import theme from './theme';

const ReduxActions = {
  articleViewer,
  clipped,
  filter,
  query,
  recentQuery,
  searchResult,
  theme,
}

export type AppActionCollection = typeof ReduxActions;
export default ReduxActions;
