import { ShortenedArticle } from "src/api/local/schema";

export type SearchResult = ShortenedArticle & {
  clipped: boolean;
}
