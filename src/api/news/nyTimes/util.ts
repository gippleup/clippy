import { SCREEN_WIDTH } from "@api/constants/generic";
import { SearchResult } from "@redux/schema/searchResult";
import { createSearchResult } from "@utils/searchResult";
import { ArticleSearchResponse, Multimedia, NYTIMES } from "./schema";

const defaultImageUrl = "https://images-na.ssl-images-amazon.com/images/I/31B-jyc2D5L.jpg"

const mapMultimediaToUrl = (multimedia: Multimedia[]) => {
  if (multimedia.length === 0) return defaultImageUrl;
  const smallImage = multimedia.filter((media) => media.type === "image" && media.width < SCREEN_WIDTH)
  if (smallImage.length === 0) return defaultImageUrl;
  const fitImage = smallImage.reduce((fit, ele) => ele.width > fit.width ? ele : fit);
  return `https://www.nytimes.com/${fitImage.url}`;
}

const mapResponseToSearchResult = (res: ArticleSearchResponse): SearchResult[] => {
  const {docs} = res.response;
  const mapped = docs.map((article) => {
    const {_id: id, abstract, headline, pub_date, web_url, multimedia} = article;
    return createSearchResult({
      ...article,
      id,
      abstract,
      pub_date,
      web_url,
      headline: headline.main,
      clipped: false,
      publisher: NYTIMES,
      photo_url: mapMultimediaToUrl(multimedia),
      clipStatus: "idle",
    })
  })
  return mapped;
}

const nyTimesApiUtil = {
  mapMultimediaToUrl,
  mapResponseToSearchResult,
}

export default nyTimesApiUtil;