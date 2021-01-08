export const mapToArray = <T>(data: T | T[]): T[] => {
  return Array.isArray(data) ? data : [data];
}

export const getHandyArray = <T>() => {
  let stored: T[] = [];
  return {
    get: () => stored,
    set: (newArray: T[]) => {stored = newArray},
    forEach: stored.forEach,
    push: stored.push,
    filter: stored.filter,
    remove: (target: T) => {stored = stored.filter((ele) => ele !== target)},
    clear: () => stored = [],
  }
}

