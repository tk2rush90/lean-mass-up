export class RenderableLetter {
  // color hex for letter
  private _colorHex = 255;
  // set `true` when `_colorHex` is `0`
  private _rendered = false;
  // letter to render
  private readonly _letter: string;

  constructor(letter: string) {
    this._letter = letter;
  }

  /**
   * return rgb color text with `_colorHex`
   */
  get color(): string {
    return `rgb(${this._colorHex}, ${this._colorHex}, ${this._colorHex})`;
  }

  /**
   * return letter
   */
  get letter(): string {
    return this._letter;
  }

  /**
   * return rendered state
   */
  get rendered(): boolean {
    return this._rendered;
  }

  /**
   * darken the letter
   * @param hex number to decrease from the previous `_colorHex`
   */
  darken(hex: number): void {
    this._colorHex = Math.max(0, this._colorHex - hex);

    if (this._colorHex === 0) {
      this._rendered = true;
    }
  }
}
