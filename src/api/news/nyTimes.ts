import Config from 'react-native-config'
import { convertOptionToQuery } from '@utils/api';
import { Article } from './nyTimes/schema';
import { SearchResult } from '@redux/schema/searchResult';
import { createSearchResult } from '@utils/searchResult';
const {NYTIMES_API_KEY} = Config;
const API_BASE = "https://api.nytimes.com/svc/";
export const NYTIMES = "nyTimes";

export type ArticleSearchOption = {
  q?: string;
  sort?: "newest" | "oldest" | "relevance";
  page?: number;
  begin_date?: string;
  end_date?: string;
  signal?: AbortSignal;
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

const fetchArticles = async(option: ArticleSearchOption): Promise<ArticleSearchResponse> => {
  const {signal, ...queryOption} = option;
  const query = convertOptionToQuery(queryOption);
  const url = `${API_BASE}search/v2/articlesearch.json?${query}&api-key=${NYTIMES_API_KEY}`;
  try {
    const res = await fetch(url, {signal});
    const json = res.json();
    return json;
  } catch (e) {
    throw e;
  }
}

const mapResponseToSearchResult = (res: ArticleSearchResponse): SearchResult[] => {
  const {docs} = res.response;
  const mapped = docs.map((article) => {
    const {_id: id, abstract, headline, pub_date, web_url} = article;
    return createSearchResult({
      ...article,
      id,
      abstract,
      pub_date,
      web_url,
      headline: headline.main,
      clipped: false,
      publisher: NYTIMES,
    })
  })
  return mapped;
}

export default {
  fetchArticles,
  mapResponseToSearchResult,
}