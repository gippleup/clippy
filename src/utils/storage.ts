import AsyncStorage from '@react-native-async-storage/async-storage'

export const setLocalData = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const jsonValue = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
}

export const getLocalData = async (key: string): Promise<null | string | false> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    throw new Error(`couldn't get local storage data for key: ${key}`);
  }
}