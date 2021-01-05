import { Clipped, ArticleIndicator } from "@redux/schema/searchResult";
import { mapToArray } from "@utils/array";
import { isIndicated, getIndicatorIndex } from "@utils/searchResult";
import { getLocalData, setLocalData } from "@utils/storage";

const LOCAL_STORAGE_KEY = "CLIPPED";
const defaultValue: Clipped[] = [];

const dummy: Clipped = {
  abstract: "This is an abstract",
  headline: "This is a headline",
  id: "123",
  pub_date: "20201010",
  publisher: "nyTimes",
  web_url: "https://localZzirasi.com",
  pinned: false,
  tag: [],
  photo_url: "",
}
const keys = Object.keys(dummy);

const _validateItem = (item: any) => {
  const isObject = typeof item === "object"
  if (!isObject) return false;
  const validityMap = Object.entries(item).map(([key, value]) => {
    const isValidKey = keys.indexOf(key) !== -1;
    //@ts-ignore
    const isValidValue = typeof value === typeof dummy[key];
    return isValidKey && isValidValue;
  });
  const isAllValid = validityMap.filter((bool) => !bool).length === 0;
  return isAllValid;
}

const _validateData = <T>(data: any): T | null => {
  if (!Array.isArray(data)) return null;
  const itemValidityMap = data.map(_validateItem);
  const isAllValid = itemValidityMap.filter((bool) => !bool).length === 0;
  return isAllValid ? data as unknown as T : null;
}

const _getValidData = async (): Promise<Clipped[]> => {
  const storedData = await getLocalData(LOCAL_STORAGE_KEY);
  const parsedData = storedData !== null && storedData !== false
    ? JSON.parse(storedData)
    : storedData;
  const validatedData = _validateData<Clipped[]>(parsedData);

  if (validatedData === null) {
    await initialize();
    return _getValidData();
  }

  return validatedData;
}

const initialize = async() => setLocalData(LOCAL_STORAGE_KEY, defaultValue);

const set = async(data: Clipped[]) => setLocalData(LOCAL_STORAGE_KEY, data);

const get = async() => await _getValidData();

const push = async(item: Clipped | Clipped[]) => {
  const items = mapToArray(item);
  const storedData = await get();
  const filtered = storedData.filter((clipped) => !isIndicated(items, clipped));
  const concatenated = filtered.concat(items);
  return set(concatenated);
}

const remove = async(indicator: ArticleIndicator | ArticleIndicator[]) => {
  const indicators = mapToArray(indicator);
  const storedData = await get();
  const filtered = storedData.filter((item) => isIndicated(indicators, item) === false);
  return set(filtered);
}

const pin = async(indicator: ArticleIndicator | ArticleIndicator[]) => {
  const indicators = mapToArray(indicator);
  const storedData = await get();
  const mapped = storedData.map((item) => {
    if (!isIndicated(indicators, item)) return item;
    return {...item, pinned: true};
  });
  return set(mapped);
}

const unpin = async(indicator: ArticleIndicator | ArticleIndicator[]) => {
  const indicators = mapToArray(indicator);
  const storedData = await get();
  const mapped = storedData.map((item) => {
    if (!isIndicated(indicators, item)) return item;
    return {...item, pinned: false};
  });
  return set(mapped);
}

const addTag = async(indicator: ArticleIndicator | ArticleIndicator[]) => {
  const indicators = mapToArray(indicator);
  const storedData = await get();
  const mapped = storedData.map((item) => {
    const indicatorIndex = getIndicatorIndex(indicators, item);
    if (indicatorIndex === -1) return item;
    const { tag = "" } = indicators[indicatorIndex];
    const filteredTag = item.tag
      ? item.tag.filter((str) => str !== tag).concat(tag)
      : [tag];
    return {...item, tag: filteredTag};
  });
  return set(mapped);
}

const removeTag = async(indicator: ArticleIndicator | ArticleIndicator[]) => {
  const indicators = mapToArray(indicator);
  const storedData = await get();
  const mapped = storedData.map((item) => {
    const indicatorIndex = getIndicatorIndex(indicators, item);
    if (indicatorIndex === -1) return item;
    const { tag = "" } = indicators[indicatorIndex];
    const filteredTag = item.tag?.filter((str) => str !== tag);
    return {...item, tag: filteredTag};
  });
  return set(mapped);
}

const clearTags = async(indicator: ArticleIndicator | ArticleIndicator[]) => {
  const indicators = mapToArray(indicator);
  const storedData = await get();
  const mapped = storedData.map((item) => {
    if (isIndicated(indicators, item) === false) return item;
    return {...item, tag: []};
  });
  return set(mapped);
}

export default {
  initialize,
  set,
  get,
  push,
  remove,
  pin,
  unpin,
  addTag,
  removeTag,
  clearTags,
}