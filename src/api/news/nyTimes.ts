import Config from 'react-native-config'
import { convertOptionToQuery } from '@utils/api';
import { Article } from './nyTimes/schema';
import util from './nyTimes/util'
import { SearchResult } from '@redux/schema/searchResult';


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

const fetchArticles = async(option: ArticleSearchOption): Promise<SearchResult[]> => {
  const {signal, ...queryOption} = option;
  const query = convertOptionToQuery(queryOption);
  const url = `${API_BASE}search/v2/articlesearch.json?${query}&api-key=${NYTIMES_API_KEY}`;
  try {
    const res = await fetch(url, {signal});
    const json = await res.json() as ArticleSearchResponse;
    const searchResults = util.mapResponseToSearchResult(json);
    return searchResults;
  } catch (e) {
    throw e;
  }
}

export default {
  fetchArticles,
  util,
}