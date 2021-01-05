export const convertOptionToQuery = (option: Object): string => {
  return Object.entries(option)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}