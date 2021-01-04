import { mapToArray } from "@utils/array";
import { getLocalData, setLocalData } from "@utils/storage";
import { RecentQuery, RecentQueryLocalStorage } from "./schema";

const LOCAL_STORAGE_KEY = "RECENT_QUERY";
const defaultValue: RecentQueryLocalStorage = {
  count: 0,
  queries: [],
};

const _validateData = <T>(data: any): T | null => {
  const isValid = typeof data === "object"
    && typeof data.count === "number"
    && Array.isArray(data.queries);
  return isValid ? data as T : null;
}

const _getValidData = async (): Promise<RecentQueryLocalStorage> => {
  const storedData = await getLocalData(LOCAL_STORAGE_KEY);
  const parsedData = storedData !== null && storedData !== false
    ? JSON.parse(storedData)
    : storedData;
  const validatedData = _validateData<RecentQueryLocalStorage>(parsedData);

  if (validatedData === null) {
    await initialize();
    return _getValidData();
  }

  return validatedData;
}

const _getCount = async(): Promise<number> => {
  const validData = await _getValidData();
  return validData.count;
}

const _mapQueryToItem = (query: string, id: number): RecentQuery => ({
  id,
  value: query,
})

const initialize = async() => setLocalData(LOCAL_STORAGE_KEY, defaultValue);

const set = async(data: RecentQuery[]) => {
  const id_max = data.reduce((acc, ele) => ele.id > acc ? ele.id : acc, 0);
  await setLocalData<RecentQueryLocalStorage>(LOCAL_STORAGE_KEY, {
    count: id_max,
    queries: data,
  });
}

const get = async(limit = 5): Promise<RecentQuery[]> => {
  const validData = await _getValidData();
  return validData.queries.slice(0, limit);
}

const push = async(query: string | string[]) => {
  const queries = mapToArray(query);
  const lastId = await _getCount();
  const newIdStart = lastId + 1;
  const validData = await _getValidData();
  const items = Array.isArray(query)
    ? query.map((q, i) => _mapQueryToItem(q, newIdStart + i))
    : [_mapQueryToItem(query, newIdStart)];
  const filtered = validData.queries.filter((q) => queries.indexOf(q.value) === -1);
  const newItems = filtered.concat(items);
  await set(newItems)
}

const remove = async(id: number) => {
  const validData = await _getValidData();
  const removed = validData.queries.filter((item) => item.id !== id);
  set(removed);
}

const api = {
  initialize,
  set,
  get,
  push,
  remove,
}

export default api;