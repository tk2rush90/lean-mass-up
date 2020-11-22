import {randomNumber} from '../../utils/random.util';
import {easeInOutQuad, easeOutBack} from '../../utils/animation.util';
import {EventEmitter} from '@angular/core';

export interface WavePointConfig {
  // initial x position
  x: number;
  // initial y position
  y: number;
  // random move range for x axis
  rangeX: number;
  // random move range for y axis
  rangeY: number;
  // random minimum duration
  minDuration: number;
  // random maximum duration
  maxDuration: number;
  // initial height level
  heightLevel: number;
  // canvas height
  height: number;
}

export class WavePoint {
  // height animated
  heightAnimated: EventEmitter<boolean> = new EventEmitter<boolean>();
  // 2d context of canvas
  private _context: CanvasRenderingContext2D;
  // current x/y positions
  private _x: number;
  private _y: number;
  // animating start x/y positions
  private _initialX: number;
  private _initialY: number;
  // target x/y positions
  private _targetX: number;
  private _targetY: number;
  // tick for x/y positions
  private _tickX: number;
  private _tickY: number;
  // moving duration for x/y position
  private _durationX: number;
  private _durationY: number;
  // anchor position of x axis
  private _anchorX: number;
  // total height of canvas
  private _height: number;
  // wave height level
  private _heightLevel: number;
  // duration for wave height animation
  private _heightDuration: number;
  // height animation ended flag
  private _heightAnimationEnd = false;
  // moving range for x/y position
  private readonly _rangeX: number;
  private readonly _rangeY: number;
  // min/max duration to create random duration
  private readonly _minDuration: number;
  private readonly _maxDuration: number;

  constructor(context: CanvasRenderingContext2D, {
    x,
    y,
    rangeX,
    rangeY,
    minDuration,
    maxDuration,
    heightLevel,
    height,
  }: WavePointConfig) {
    this._context = context;
    this._rangeX = rangeX;
    this._rangeY = rangeY;
    this._minDuration = minDuration;
    this._maxDuration = maxDuration;
    this._x = x;
    this._y = y;
    this._anchorX = x;
    this._height = height;
    this._heightLevel = heightLevel;
    this.updateWavingTarget();
  }

  /**
   * return x point
   */
  get x(): number {
    return this._x;
  }

  /**
   * return y point
   */
  get y(): number {
    return this._y;
  }

  /**
   * distance between target and current x position
   */
  get dx(): number {
    return Math.abs(this._targetX) - Math.abs(this._x);
  }

  /**
   * distance between target and current y position
   */
  get dy(): number {
    return Math.abs(this._targetY) - Math.abs(this._y);
  }

  /**
   * return anchor position of y axis
   */
  get anchorY(): number {
    return this._height - (this._height * this._heightLevel);
  }

  /**
   * draw point dot on the canvas
   */
  render(): void {
    this._context.beginPath();
    this._context.arc(this._x, this._y, 3, 0, Math.PI * 2, false);
    this._context.fillStyle = '#000';
    this._context.fill();
    this._context.closePath();
  }

  /**
   * animate points
   */
  animate(): void {
    this._animateX();
    this._animateY();
  }

  /**
   * update height level and waving target
   * @param level
   * height level to update
   * from `0` to `1` is available
   * @param duration height level animating duration
   */
  updateHeightLevel(level: number, duration: number): void {
    this._heightLevel = level;
    this._heightDuration = duration;
    this._initialY = this._y;
    this._targetY = this.anchorY + randomNumber(-this._rangeY, this._rangeY);
  }

  /**
   * update point and max height of canvas to redraw the wave
   * @param x x position
   * @param y y position
   * @param height canvas height
   */
  updatePoints(x: number, y: number, height: number): void {
    this._x = x;
    this._y = y;
    this._anchorX = x;
    this._height = height;
  }

  /**
   * update target x/y points
   */
  updateWavingTarget(): void {
    this._updateTargetX();
    this._updateTargetY();
  }

  /**
   * update target x point
   */
  private _updateTargetX(): void {
    this._initialX = this._x;
    this._targetX = this._anchorX + randomNumber(-this._rangeX, this._rangeX);
    this._tickX = 0;
    this._durationX = randomNumber(this._minDuration, this._maxDuration);
  }

  /**
   * update target y point
   */
  private _updateTargetY(): void {
    this._initialY = this._y;
    this._targetY = this.anchorY + randomNumber(-this._rangeY, this._rangeY);
    this._tickY = 0;
    this._durationY = randomNumber(this._minDuration, this._maxDuration);
  }

  /**
   * animate x position
   */
  private _animateX(): void {
    // update target x when x position movement ended
    if (this.dx === 0) {
      this._updateTargetX();
    }

    const t = this._tickX;
    const b = this._initialX;
    const c = this._targetX - this._initialX;
    const d = this._durationX;

    this._x = easeInOutQuad(t, b, c, d);
    this._tickX++;
  }

  /**
   * animate y position
   */
  private _animateY(): void {
    // update target y when y position movement ended
    if (this.dy === 0) {
      this._updateTargetY();
    }

    const t = this._tickY;
    const b = this._initialY;
    const c = this._targetY - this._initialY;
    const d = this._durationY;

    this._y = easeInOutQuad(t, b, c, d);
    this._tickY++;
  }

  /**
   * animate height level
   * emit `heightAnimated` with animation finished state
   * @param t tick
   */
  animateHeightLevel(t: number): void {
    if (!this._heightAnimationEnd) {
      const b = this._initialY;
      const c = this._targetY - this._initialY;

      this._y = easeOutBack(t, b, c, this._heightDuration);
      this._heightAnimationEnd = this.dy === 0;
      this.heightAnimated.emit(this._heightAnimationEnd);

      if (this._heightAnimationEnd) {
        // set new waving point targets after height animating ended
        this.updateWavingTarget();
      }
    } else {
      // run `animate()` method when height animation is ended
      // to transition to waving animation smoothly
      this.animate();
    }
  }
}
