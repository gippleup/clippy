import { ShortenedArticle } from "@api/local/schema";

export type SearchResult = ShortenedArticle & {
  clipped: boolean;
}
