export class SliderStep {
  private _value: number;
  private _x: number;

  constructor(value: number) {
    this._value = value;
  }

  /**
   * set x position of step
   * @param x x position
   */
  set x(x: number) {
    this._x = x;
  }

  /**
   * return x position of step
   */
  get x(): number {
    return this._x;
  }

  /**
   * return value
   */
  get value(): number {
    return this._value;
  }
}
