import { ArticleIndicator, Clipped, SearchResult, ShortenedArticle } from "@redux/schema/searchResult";

export const indicatesItem = (indicator: ArticleIndicator, item: ShortenedArticle) => {
  return item.publisher === indicator.publisher && item.id === indicator.id;
}

export const getIndicatorIndex = (indicators: ArticleIndicator[], item: ShortenedArticle) => {
  return indicators.findIndex((indicator) => indicatesItem(indicator, item));
}

export const isIndicated = (indicators: ArticleIndicator[], item: ShortenedArticle) => {
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