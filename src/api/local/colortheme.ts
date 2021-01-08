import { ColorThems, SupportedColorTheme } from "@api/colortheme";
import { getLocalData, setLocalData } from "@utils/storage";

const LOCAL_STORAGE_KEY = "COLOR_THEME";
const defaultValue: SupportedColorTheme = "light";

const initialize = async () => set(defaultValue);
const _getValidData = async (): Promise<SupportedColorTheme> => {
  const stored = await getLocalData(LOCAL_STORAGE_KEY);
  const isValid = typeof stored === "string"
    && ColorThems.indexOf(stored) !== -1;
  if (isValid) return stored as SupportedColorTheme;
  await initialize();
  return _getValidData();
}
const set = async (theme: SupportedColorTheme): Promise<boolean> => setLocalData(LOCAL_STORAGE_KEY, theme);
const get = _getValidData;

export default {
  initialize,
  set,
  get,
}