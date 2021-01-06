import { RegisteredPublisher } from "./publishers";

export type SearchResult = ShortenedArticle & {
  clipped: boolean;
}

export type ShortenedArticle = {
  publisher: RegisteredPublisher;
  id: string;
  pub_date: string;
  headline: string;
  abstract: string;
  web_url: string;
  photo_url: string;
}

export type Clipped = SearchResult & {
  pinned: boolean;
  tag: string[];
}

export type ArticleIndicator = Pick<Clipped, "id" | "publisher">
