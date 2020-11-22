/**
 * transform hex to hsl number array
 * @param hex hex string
 */
export function hexToHSL(hex: string): number[] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return [h, s, l];
}

/**
 * hsl value to hex
 * @param h hue
 * @param s saturation
 * @param l lightness
 */
export function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  let r;
  let g;
  let b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRGB(p, q, h + 1 / 3);
    g = hueToRGB(p, q, h);
    b = hueToRGB(p, q, h - 1 / 3);
  }

  return `${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * hue value to rgb
 * @param p p
 * @param q q
 * @param t t
 */
export function hueToRGB(p: number, q: number, t: number): number {
  if (t < 0) {
    t += 1;
  }

  if (t > 1) {
    t -= 1;
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }

  if (t < 1 / 2) {
    return q;
  }

  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }

  return p;
}

/**
 * change x value to hex string
 * @param x x value
 */
export function toHex(x: number): string {
  const hex = Math.round(x * 255).toString(16);

  return hex.length === 1 ? '0' + hex : hex;
}

/**
 * return `true` when background is dark
 * @param color color string
 */
export function isDarkBackground(color: string): boolean {
  return luma(color) < 165;
}

/**
 * get luma value to define content color
 * @param color color string
 */
export function luma(color: string): number {
  const rgb = (typeof color === 'string') ? hexToRGB(color) : color;
  return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
}

/**
 * hex to rgb number array
 * @param color color string
 */
export function hexToRGB(color: string): number[] {
  if (color.length === 3) {
    color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
  } else if (color.length !== 6) {
    throw new Error('Invalid hex color: ' + color);
  }

  const rgb = [];

  for (let i = 0; i <= 2; i++) {
    rgb[i] = parseInt(color.substr(i * 2, 2), 16);
  }

  return rgb;
}
