import Config from 'react-native-config'
import { convertOptionToQuery } from 'src/utils/api';
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

export const fetchArticles = (option: ArticleSearchOption): Promise<ArticleSearchResponse> => {
  const query = convertOptionToQuery(option);
  const url = `${API_BASE}search/v2/articlesearch.json?${query}&api-key=${NYTIMES_API_KEY}`;
  return fetch(url)
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
    return null;
  });
}
