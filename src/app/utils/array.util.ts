/**
 * return the sum of number array
 * @param previous previous number
 * @param current current number
 */
export function sumReduces(previous: number, current: number): number {
  return (previous || 0) + current;
}

/**
 * return the previous item from the index
 * @param array whole array object
 * @param index index to cut
 */
export function previousItems<T>(array: T[], index: number): T[] {
  return [...array].splice(0, index);
}
