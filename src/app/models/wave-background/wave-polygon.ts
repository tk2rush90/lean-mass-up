import {WavePoint} from './wave-point';

export interface WavePolygonConfig {
  // canvas width
  width: number;
  // canvas height
  height: number;
  // random move range for x axis
  rangeX: number;
  // fill color
  fill: string;
}

export class WavePolygon {
  // 2d context to draw
  private _context: CanvasRenderingContext2D;
  // wave point objects
  private _points: WavePoint[] = [];
  // canvas width
  private _width: number;
  // canvas height
  private _height: number;
  // random move range for x axis
  private readonly _rangeX: number;
  // fill color
  private readonly _fill: string;

  constructor(context: CanvasRenderingContext2D, points: WavePoint[], {
    width,
    height,
    rangeX,
    fill,
  }: WavePolygonConfig) {
    this._context = context;
    this._points = points;
    this._width = width;
    this._height = height;
    this._rangeX = rangeX;
    this._fill = fill;
    this.render();
  }

  /**
   * render wave polygon to display
   */
  render(): void {
    this._context.beginPath();
    this._context.moveTo(this._points[0].x, this._points[0].y);
    for (let i = 0; i < this._points.length - 1; i++) {
      const c = (this._points[i].x + this._points[i + 1].x) / 2;
      const d = (this._points[i].y + this._points[i + 1].y) / 2;
      this._context.quadraticCurveTo(this._points[i].x, this._points[i].y, c, d);
    }
    this._context.lineTo(this._width + this._rangeX, this._height);
    this._context.lineTo(-this._rangeX, this._height);
    this._context.closePath();
    this._context.fillStyle = this._fill;
    this._context.fill();
  }

  /**
   * update polygon size
   * @param width width
   * @param height height
   */
  updatePolygonSize(width: number, height: number): void {
    this._width = width;
    this._height = height;
  }
}
