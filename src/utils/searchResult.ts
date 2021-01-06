import { ArticleIndicator, Clipped, SearchResult, ShortenedArticle } from "@redux/schema/searchResult";
import { mapToArray } from "./array";

export const indicatesItem = (indicator: ArticleIndicator, item: ArticleIndicator) => {
  return item.publisher === indicator.publisher && item.id === indicator.id;
}

export const getIndicatorIndex = (indicator: ArticleIndicator | ArticleIndicator[], item: ArticleIndicator) => {
  const indicators = mapToArray(indicator)
  return indicators.findIndex((indicator) => indicatesItem(indicator, item));
}

export const isIndicated = (indicator: ArticleIndicator | ArticleIndicator[], item: ArticleIndicator) => {
  const indicators = mapToArray(indicator)
  const indicatorIndex = getIndicatorIndex(indicators, item);
  return indicatorIndex !== -1;
}

export const createSearchResult = (option: SearchResult) => option;

export const converToClipped = (searchResult: SearchResult): Clipped => ({
  ...searchResult,
  clipped: true,
  pinned: false,
  tag: [],
})