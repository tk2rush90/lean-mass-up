/**
 * check whether base string contains search string or now
 * @param base base string
 * @param search string to search from base
 * @param caseSensitive set `true` to checking with case sensitive
 */
export function containsText(base: string, search: string, caseSensitive = false): boolean {
  base = base || '';
  search = search || '';

  if (caseSensitive) {
    return base.indexOf(search) !== -1;
  } else {
    return base.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  }
}
