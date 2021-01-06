/**Return sliced string with tail, **if given string length is longer than specified length** */
export const shortenWithTail = (str: string, start: number, end: number, tail = "...") => {
  return `${str.slice(start, end)}${str.length > end ? tail : ""}`
}