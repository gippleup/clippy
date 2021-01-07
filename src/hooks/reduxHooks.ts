import { createReduxHook } from "@utils/redux";

export const useReduxArticleViewer = createReduxHook("articleViewer");
export const useReduxClipped = createReduxHook("clipped");
export const useReduxFilter = createReduxHook("filter");
export const useReduxQuery = createReduxHook("query");
export const useReduxRecentQuery = createReduxHook("recentQuery");
export const useReduxSearchResult = createReduxHook("searchResult");
export const useReduxTheme = createReduxHook("theme");