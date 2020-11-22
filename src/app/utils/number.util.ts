/**
 * remove leading zeros from numeric string
 * @param value numeric string to remove
 */
export function removeLeadingZeros(value: string): string {
  const search = /^0[0-9]+/.exec(value || '');

  if (search) {
    // remove leading `0~`
    value = value.replace(/^0+/, '');
  }

  return value;
}

/**
 * remove floating numbers after specific size
 * @param value numeric string to remove
 * @param size available number size
 */
export function removeFloatingNumbers(value: string, size: number): string {
  const split = (value || '').split('.');

  if (split.length > 1) {
    split[1] = split[1].substr(0, size);

    return split.join('.');
  } else {
    return value;
  }
}

/**
 * get the numeric string between specific range
 * if value is `null` | `undefined` | `''`, return `'0'`
 * @param value numeric string to transform
 * @param min minimum value
 * @param max maximum value
 */
export function getAvailableNumber(value: string, min: number, max: number): string {
  const numeric = parseFloat(value || '0');

  if (max !== 0 && numeric > max) {
    // set max value
    value = `${max}`;
  } else if (numeric < min) {
    // set min value
    value = `${min}`;
  } else if (!value) {
    // set `0` as initial
    value = '0';
  }

  return value;
}
