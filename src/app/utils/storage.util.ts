/**
 * set data to local storage
 * @param key key name
 * @param data data to set
 */
export function setToLocalStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * get data from local storage
 * @param key key name
 */
export function getFromLocalStorage<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) || null);
}
