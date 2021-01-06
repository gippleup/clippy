import { RegisteredPublisher } from "./publishers";

export interface ShortenedArticle {
  publisher: RegisteredPublisher;
  id: string;
  pub_date: string;
  headline: string;
  abstract: string;
  web_url: string;
  photo_url: string;
}

export interface SearchResult extends ShortenedArticle {
  clipped: boolean;
  clipStatus: "pending" | "idle";
}

export interface Clipped extends SearchResult {
  pinned: boolean;
  tag: string[];
}

export type ArticleIndicator = Pick<Clipped, "id" | "publisher">
