export type Multimedia = {
  rank: number;
  subtype: string;
  caption: string
  credit: string
  type: string
  url: string
  height: number
  width: number
  legacy: {
    xlarge: string;
    xlargewidth: number;
    xlargeheight: number;
  }
  crop_name: string;
}

export type Headline = {
  main: string;
  kicker: string;
  content_kicker: string;
  print_headline: string;
  name: string;
  seo: string;
  sub: string;
}

export type Keyword = {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export type Person = {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
}

export type Byline = {
  original: string;
  person: Person[];
  organization: string;
}

export type Article = {
  abstract: string;
  web_url: string;
  snippet: string;
  print_page: number;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  score: number;
  url: string;
}

export type ArticleSearchResponse = {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    }
  },
}

export const NYTIMES = "nyTimes";
