import Config from 'react-native-config'
import { convertOptionToQuery } from '@utils/api';
import { Article } from './nyTimes/schema';
const {NYTIMES_API_KEY} = Config;
const API_BASE = "https://api.nytimes.com/svc/";

type ArticleSearchOption = {
  q?: string;
  sort?: "newest" | "oldest" | "relevance";
  page?: number;
  begin_date?: string;
  end_date?: string;
}

type ArticleSearchResponse = {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    }
  }
}

export const fetchArticles = async(option: ArticleSearchOption): Promise<ArticleSearchResponse | null> => {
  const query = convertOptionToQuery(option);
  const url = `${API_BASE}search/v2/articlesearch.json?${query}&api-key=${NYTIMES_API_KEY}`;
  try {
    const res = await fetch(url);
    const json = res.json();
    return json;
  } catch (e) {
    return null;
  }
}
