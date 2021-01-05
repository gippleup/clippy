import { mapToArray } from "@utils/array";
import { getLocalData, setLocalData } from "@utils/storage";
import { RecentQueryLocalStorage } from "./schema";

const LOCAL_STORAGE_KEY = "RECENT_QUERY";
const defaultValue: RecentQueryLocalStorage = {
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

const initialize = async() => setLocalData(LOCAL_STORAGE_KEY, defaultValue);

const set = async(data: string[]) => {
  await setLocalData<RecentQueryLocalStorage>(LOCAL_STORAGE_KEY, {
    queries: data,
  });
}

const get = async(limit = 5): Promise<string[]> => {
  const validData = await _getValidData();
  return validData.queries.slice(0, limit);
}

const push = async(query: string | string[]) => {
  const queries = mapToArray(query).filter((q) => q !== "");
  const validData = await _getValidData();
  const filtered = validData.queries.filter((q) => queries.indexOf(q) === -1);
  const updated = filtered.concat(query);
  await set(updated)
}

const remove = async(query: string) => {
  const validData = await _getValidData();
  const removed = validData.queries.filter((q) => q !== query);
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