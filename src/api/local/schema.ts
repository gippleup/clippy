import { RegisteredPublisher } from "@redux/schema/publishers"

export type RecentQueryLocalStorage = {
  queries: string[];
}

export type ShortenedArticle = {
  publisher: RegisteredPublisher;
  id: string;
  pub_date: string;
  headline: string;
  abstract: string;
  web_url: string;
}

export type Clipped = ShortenedArticle & {
  pinned?: boolean;
  tag?: string[];
}

export type ClippedLocalStorage = Clipped[];

export type ArticleIndicator = Pick<Clipped, "id" | "publisher"> & {tag?: string};
