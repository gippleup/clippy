import { RegisteredPublisher } from "@redux/schema/publishers"

export type RecentQuery = {
  id: number;
  value: string;
}

export type RecentQueryLocalStorage = {
  count: number,
  queries: RecentQuery[];
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
