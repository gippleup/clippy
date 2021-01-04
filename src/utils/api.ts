export const convertOptionToQuery = (option: Object): string => {
  return Object.entries(option)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}