import nyTimes from './news/nyTimes';

const newsApi = {
  nyTimes,
}

export const REGISTERED_PUBLISHERS = Object.keys(newsApi) as (keyof typeof newsApi)[];

export default newsApi;