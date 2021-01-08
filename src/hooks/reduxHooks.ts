import { queryPromiseManager, runAndRegisterToQueryManager } from "@utils/hooks";
import { createReduxHook } from "@utils/redux";

export const useReduxArticleViewer = createReduxHook("articleViewer");
export const useReduxClipped = createReduxHook("clipped");
export const useReduxFilter = createReduxHook("filter");

export const useReduxQuery = createReduxHook("query", {
  search: (actionCreator, dispatch) => (...args) => {
    queryPromiseManager.abortPrevious();
    runAndRegisterToQueryManager(actionCreator, dispatch)(...args);
  },
  fetchNextPage: runAndRegisterToQueryManager,
  fetchPush: runAndRegisterToQueryManager,
  fetchSet: runAndRegisterToQueryManager,
  refresh: runAndRegisterToQueryManager,
});

export const useReduxRecentQuery = createReduxHook("recentQuery");
export const useReduxSearchResult = createReduxHook("searchResult");
export const useReduxTheme = createReduxHook("theme");