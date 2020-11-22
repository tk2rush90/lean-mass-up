import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {WavePoint} from '../../../models/wave-background/wave-point';
import {WavePolygon} from '../../../models/wave-background/wave-polygon';
import {randomNumber} from '../../../utils/random.util';
import {combineLatest} from 'rxjs';
import {SubscriptionService} from '../../../services/subscription/subscription.service';

/**
 * inspired by https://codepen.io/jackrugile/pen/BvLHg
 */
@Component({
  selector: 'app-wave-background',
  templateUrl: './wave-background.component.html',
  styleUrls: ['./wave-background.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class WaveBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  // the number of wave points
  @Input() points = 5;
  // set `true` to use height animation
  @Input() animateHeight = false;
  // set `true` to show wave polygon points
  // use this for debugging
  @Input() showWavePoints = false;
  // set `true` to make wave interactive
  @Input() interactive = false;
  // wave color
  @Input() color: string;
  // background color
  @Input() @HostBinding('style.background-color') backgroundColor: string;

  /**
   * set initial height level
   * @param level height level can be `0` to `1`
   */
  @Input() set initialHeightLevel(level: number) {
    this._heightLevel = level;
    this._initialHeightLevel = level;
  }
  // canvas element
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  // target height level
  // height level can be `0` to `1`
  private _targetHeightLevel: number;
  // current height level
  // height level can be `0` to `1`
  private _heightLevel = 0;
  // initial height level can be `0` to `1`
  private _initialHeightLevel = 0;
  // x random movement range
  private _rangeX = 20;
  // y random movement range
  private _rangeY = 10;
  // random minimum duration
  private _minDuration = 40;
  // random maximum duration
  private _maxDuration = 80;
  // an array of `WavePoint` object
  private _wavePoints: WavePoint[] = [];
  // wave polygon
  private _wavePolygon: WavePolygon;
  // animation frame
  private _frame: number;
  // height change tick
  private _heightTick = 0;
  // target height updated flag
  private _heightUpdated = false;
  // flag for detecting height animation end
  private _heightAnimationEnd = false;
  // height level animating duration
  private readonly _heightLevelDuration = 120;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._render();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this._frame);
  }

  /**
   * return host element
   */
  get element(): HTMLElement {
    return this.elementRef?.nativeElement;
  }

  /**
   * return canvas element
   */
  get canvasElement(): HTMLCanvasElement {
    return this.canvas?.nativeElement;
  }

  /**
   * return 2d context of canvas
   */
  get context(): CanvasRenderingContext2D {
    return this.canvasElement?.getContext('2d');
  }

  /**
   * return element width
   */
  get width(): number {
    return this.element?.offsetWidth || 0;
  }

  /**
   * return element height
   */
  get height(): number {
    return this.element?.offsetHeight || 0;
  }

  /**
   * return `true` when the element is ready to render
   */
  get ready(): boolean {
    return !!(this.element && this.canvasElement);
  }

  /**
   * return initial wave height
   */
  get waveHeight(): number {
    return this.height - (this.height * this._initialHeightLevel);
  }

  /**
   * return point x spacing size
   */
  get pointSpacing(): number {
    return (this.width * 1.5) / (this.points - 1);
  }

  /**
   * return `true` when height level is animating
   */
  get heightAnimating(): boolean {
    return this.animateHeight && !this._heightAnimationEnd;
  }

  /**
   * set target height level
   * @param level level
   */
  set targetHeightLevel(level: number) {
    this._targetHeightLevel = Math.min(1, level);
    this._heightAnimationEnd = false;
    this._heightUpdated = false;
    this._heightTick = 0;
    this._subscribeHeightAnimated();
    this._updateWaveHeightLevel();
  }

  /**
   * render the wave
   */
  private _render(): void {
    if (this.ready) {
      this._setCanvasSize();
      this._createPoints();
      this._renderPoints();
      this._frame = requestAnimationFrame(this._animate);
    }
  }

  /**
   * fit canvas size to element size
   */
  private _setCanvasSize(): void {
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
  }

  /**
   * create wave points for skeleton of polygon
   */
  private _createPoints(): void {
    this._wavePoints = [];

    const spacing = this.pointSpacing;

    for (let i = 0; i < this.points + 2; i++) {
      this._wavePoints.push(new WavePoint(this.context, {
        x: (spacing * (i - 1)) - this._rangeX,
        y: this.waveHeight,
        rangeX: this._rangeX,
        rangeY: this._rangeY,
        minDuration: this._minDuration,
        maxDuration: this._maxDuration,
        heightLevel: this._initialHeightLevel,
        height: this.height,
      }));
    }
  }

  /**
   * render wave polygon
   * create instance when the first calling
   */
  private _renderPolygon(): void {
    if (!this._wavePolygon) {
      this._wavePolygon = new WavePolygon(this.context, this._wavePoints, {
        width: this.width,
        height: this.height,
        rangeX: this._rangeX,
        fill: this.color,
      });
    }

    this._wavePolygon?.render();
  }

  /**
   * animate the canvas elements
   */
  private _animate = (): void => {
    this._clearCanvas();
    this._animateWavingPoints();
    this._renderPoints();
    this._renderPolygon();
    this._frame = requestAnimationFrame(this._animate);
  }

  /**
   * render wave points for debugging
   */
  private _renderPoints(): void {
    if (this.showWavePoints) {
      this._wavePoints.forEach(point => point.render());
    }
  }

  /**
   * animate waving points to display waving polygon
   */
  private _animateWavingPoints(): void {
    if (this.heightAnimating) {
      this._wavePoints.map(point => {
        point.animateHeightLevel(this._heightTick);
      });

      this._heightTick++;
    } else {
      this._wavePoints.forEach(point => point.animate());
    }
  }

  /**
   * subscribe height animated state
   * if all height animation is finished, set `_heightAnimationEnd` to `true` to stop animating
   */
  private _subscribeHeightAnimated(): void {
    const sub = combineLatest(
      this._wavePoints.map(point => point.heightAnimated),
    ).subscribe(res => {
      this._heightAnimationEnd = res.every(item => item);
    });

    this.subscriptionService.store('_subscribeHeightAnimated', sub);
  }

  /**
   * update waving height level to show up wave polygon
   */
  private _updateWaveHeightLevel(): void {
    this._wavePoints.forEach(point => {
      point.updateHeightLevel(this._targetHeightLevel, randomNumber(this._heightLevelDuration, this._heightLevelDuration * 2));
    });
  }

  /**
   * clear canvas area to redraw
   */
  private _clearCanvas(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * change wave size when window resized
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this._windowSizeChanged();
  }

  /**
   * update every positions and sizes
   */
  private _windowSizeChanged(): void {
    // call `_setCanvasSize()` twice to remove scroll bar padding
    this._setCanvasSize();
    this._setCanvasSize();
    this._updateWavePoints();
    this._updateWavePolygonSize();
  }

  /**
   * update wave points according to resized size
   */
  private _updateWavePoints(): void {
    const spacing = this.pointSpacing;

    this._wavePoints.forEach((point, i) => {
      point.updatePoints((spacing * (i - 1)) - this._rangeX, this.waveHeight, this.height);

      // reset the height tick to animate height level
      if (this.heightAnimating) {
        this._heightTick = 0;
      }

      // update target points to animate points
      point.updateWavingTarget();
    });
  }

  /**
   * update polygon size according to resized size
   */
  private _updateWavePolygonSize(): void {
    this._wavePolygon?.updatePolygonSize(this.width, this.height);
  }
}
