import {AfterViewInit, Component, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {getNutritionBackgroundColorSet, NutritionProperties} from '../../../utils/nutrition.util';
import {hexToRGB} from '../../../utils/color.util';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {NutritionStatusValueComponent} from './nutrition-status-value/nutrition-status-value.component';
import {WaveBackgroundComponent} from '../../common/wave-background/wave-background.component';

export type ShowUpAnimationState = 'showUp' | 'hidden';
export const SHOW_UP = 'showUp';
export const HIDDEN = 'hidden';

@Component({
  selector: 'app-nutrition-wave',
  templateUrl: './nutrition-wave.component.html',
  styleUrls: ['./nutrition-wave.component.scss'],
  animations: [
    trigger('waveShowUp', [
      state(HIDDEN, style({
        transform: 'translateY(100%)',
        opacity: 0,
      })),
      state(SHOW_UP, style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
      transition(`${HIDDEN} <=> ${SHOW_UP}`, animate('1s cubic-bezier(.21,.96,.38,1)')),
    ]),
    trigger('nutritionShowUp', [
      state(HIDDEN, style({
        transform: 'translateY(50%)',
        opacity: 0,
      })),
      state(SHOW_UP, style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
      // use different transition with `'waveShowUp'` animation
      transition(`${HIDDEN} <=> ${SHOW_UP}`, animate('1s linear')),
    ])
  ]
})
export class NutritionWaveComponent implements OnInit, AfterViewInit, OnDestroy {
  // wave rendering index
  @Input() index: number;
  // nutrition type
  @Input() @HostBinding('attr.lmu-type') type: keyof NutritionProperties;
  // required nutrition
  @Input() set requiredNutrition(requiredNutrition: number) {
    this._requiredNutrition = requiredNutrition;
    this._updateWaveBackgroundHeight();
  }
  // fulfilled nutrition
  @Input() set fulfilledNutrition(fulfilledNutrition: number) {
    this._fulfilledNutrition = fulfilledNutrition;
    this._updateWaveBackgroundHeight();
  }
  // bind wave animation state
  @HostBinding('@waveShowUp') waveState: ShowUpAnimationState = HIDDEN;

  /**
   * bind background color
   * background color will be use transparent color by `.5` from the wave color
   */
  @HostBinding('style.background-color') get backgroundColor(): string {
    if (this.type) {
      const [r, g, b]: number[] = hexToRGB(this.color.replace('#', ''));

      return `rgba(${r}, ${g}, ${b}, .5)`;
    }
  }
  // wave background component
  @ViewChild(WaveBackgroundComponent) waveBackground: WaveBackgroundComponent;
  // nutrition value status component
  @ViewChild(NutritionStatusValueComponent) nutritionStatusValue: NutritionStatusValueComponent;
  // nutrition value animation state
  nutritionState: ShowUpAnimationState = HIDDEN;
  // nutrition color sets
  private _colorSet: NutritionProperties = getNutritionBackgroundColorSet();
  // show up animation timeout timer
  private _timer: any;
  // emit `true` when hiding animation ended
  private _hidingEnd: EventEmitter<boolean> = new EventEmitter<boolean>();
  // required nutrition
  private _requiredNutrition = 0;
  // fulfilled nutrition
  private _fulfilledNutrition = 0;
  // delay for animation
  // the component will start animation after rendering index * delay
  private readonly _delay = 150;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startShowing();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  /**
   * wave color
   */
  get color(): string {
    return this._colorSet[this.type];
  }

  /**
   * return required nutrition
   */
  get requiredNutrition(): number {
    return this._requiredNutrition;
  }

  /**
   * return fulfilled nutrition
   */
  get fulfilledNutrition(): number {
    return this._fulfilledNutrition;
  }

  /**
   * showing the component after delay
   * @param toState target state
   */
  private _animateAfterDelay(toState: ShowUpAnimationState): void {
    clearTimeout(this._timer);

    this._timer = setTimeout(() => {
      this.waveState = toState;
    }, this._delay * this.index);
  }

  /**
   * detect animation starting timing
   * when `toState = SHOW_UP`, show up the nutrition value after finished
   * @param event animation event
   */
  @HostListener('@waveShowUp.start', ['$event'])
  onHostShowUpStart(event: AnimationEvent): void {
    if (event.toState === SHOW_UP) {
      this.nutritionState = SHOW_UP;
    }
  }

  /**
   * detect animation finishing timing
   * when `toState = HIDDEN`, then emit `_hidingEnd` with `true`
   * @param event animation event
   */
  @HostListener('@waveShowUp.done', ['$event'])
  onHostShowUpDone(event: AnimationEvent): void {
    if (event.toState === HIDDEN) {
      this._hidingEnd.emit(true);
    }
  }

  /**
   * trigger hiding animation
   * return `hidingEnd` emitter to make subscribe the end of animation
   */
  startHiding(): Observable<boolean> {
    this._animateAfterDelay(HIDDEN);

    return this._hidingEnd;
  }

  /**
   * trigger showing animation
   */
  startShowing(): void {
    this._animateAfterDelay(SHOW_UP);
    this._updateWaveBackgroundHeight();
  }

  /**
   * update wave background height
   */
  private _updateWaveBackgroundHeight(): void {
    if (this.waveBackground) {
      this.waveBackground.targetHeightLevel = (this.fulfilledNutrition / this.requiredNutrition) || 0;
    }
  }
}
