import { ArticleIndicator, Clipped } from "@api/local/schema";

type ClippedIndicator = Pick<Clipped, "id" | "publisher">;

export const indicatesItem = (indicator: ClippedIndicator, item: Clipped) => {
  return item.publisher === indicator.publisher && item.id === indicator.id;
}

export const getIndicatorIndex = (indicators: ClippedIndicator[], item: Clipped) => {
  return indicators.findIndex((indicator) => indicatesItem(indicator, item));
}

export const isIndicated = (indicators: ClippedIndicator[], item: Clipped) => {
  const indicatorIndex = getIndicatorIndex(indicators, item);
  return indicatorIndex !== -1;
}