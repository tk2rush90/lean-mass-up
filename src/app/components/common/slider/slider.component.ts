import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core';
import {SliderStep} from '../../../models/slider/slider-step';
import {FormControlBaseDirective} from '../../base/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent extends FormControlBaseDirective<number> implements OnInit, AfterViewInit, OnDestroy {
  /**
   * set min value
   * @param min min value
   */
  @Input() set min(min: number) {
    this._min = min || 0;
    this._initialize();
  }

  /**
   * set max value
   * @param max max value
   */
  @Input() set max(max: number) {
    this._max = max || 10;
    this._initialize();
  }

  /**
   * set step size
   * @param step step size should be smaller than max - min
   */
  @Input() set step(step: number) {
    this._step = step || 1;
    this._initialize();
  }
  // label element
  @ViewChild('label') labelRef: ElementRef<HTMLElement>;
  // label arrow element
  @ViewChild('labelArrow') labelArrowRef: ElementRef<SVGElement>;
  // slider track element
  @ViewChild('sliderTrack') sliderTrackRef: ElementRef<HTMLElement>;
  // slider button element
  @ViewChild('sliderButton') sliderButtonRef: ElementRef<HTMLElement>;
  // value
  value: number;
  // set `true` when the mouse grabbed the button
  grabbing = false;
  // min value
  private _min = 0;
  // max value
  private _max = 10;
  // step size
  private _step = 1;
  // total length
  private _total: number;
  // step width
  private _stepWidth: number;
  // throttle timer for `_initialize()` method
  private _throttleTimer: any;
  // target step
  private _targetStep: SliderStep;
  // an array of slider step objects
  private _sliderSteps: SliderStep[] = [];

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
    this._initialize();
  }

  ngAfterViewInit(): void {
    this._initialize();
  }

  ngOnDestroy(): void {
    clearTimeout(this._throttleTimer);
    this._removeGrabMovingEvent();
    this._removeReleaseEvent();
  }

  /**
   * return host element
   */
  get host(): HTMLElement {
    return this.elementRef?.nativeElement;
  }

  /**
   * return label element
   */
  get label(): HTMLElement {
    return this.labelRef?.nativeElement;
  }

  /**
   * return label arrow element
   */
  get labelArrow(): SVGElement {
    return this.labelArrowRef?.nativeElement;
  }

  /**
   * return slider track element
   */
  get sliderTrack(): HTMLElement {
    return this.sliderTrackRef?.nativeElement;
  }

  /**
   * return slider button element
   */
  get sliderButton(): HTMLElement {
    return this.sliderButtonRef?.nativeElement;
  }

  /**
   * return total step size
   */
  get stepLength(): number {
    return (this._total / this._step) + 1;
  }

  /**
   * initialize the slider
   */
  private _initialize(): void {
    clearTimeout(this._throttleTimer);

    this._throttleTimer = setTimeout(() => {
      this.value = this.value || this._min;
      this._setTotalLength();
      this._createSliderSteps();
      this._setXPositions();
      this._findTargetStepByValue();
      this._moveToTargetPosition();
    });
  }

  /**
   * set total length of step
   */
  private _setTotalLength(): void {
    this._total = this._max - this._min;
  }

  /**
   * create slider step point objects
   */
  private _createSliderSteps(): void {
    this._sliderSteps = [];

    for (let i = 0; i < this.stepLength; i++) {
      this._sliderSteps.push(new SliderStep(this._min + (this._step * i)));
    }
  }

  /**
   * set x positions for slider steps
   */
  private _setXPositions(): void {
    if (this.sliderTrack) {
      const width = this.sliderTrack.offsetWidth;

      this._stepWidth = width / (this._sliderSteps.length - 1);

      this._sliderSteps.forEach((step, index) => {
        step.x = this._stepWidth * index;
      });
    }
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: number): void {
    this.value = value || this._min;
    this._findTargetStepByValue();
    this._moveToTargetPosition();
  }

  /**
   * grab the button
   */
  grabButton(): void {
    this.grabbing = true;
    this._addGrabMovingEvent();
    this._addReleaseEvent();
  }

  /**
   * release the button
   */
  releaseButton(): void {
    this.grabbing = false;
    this._removeGrabMovingEvent();
    this._removeReleaseEvent();
    this._moveToTargetPosition();
    this.setValue(this.value);
  }

  /**
   * add grab moving event to component
   */
  private _addGrabMovingEvent(): void {
    window.addEventListener('mousemove', this._grabMovingHandler);
    window.addEventListener('touchmove', this._grabMovingHandler);
  }

  /**
   * handle grab moving
   * update button and label position according to mouse position
   * @param event mouse event
   */
  private _grabMovingHandler = (event: MouseEvent): void => {
    const rect = this.sliderTrack.getBoundingClientRect();
    let x = event.x - rect.x;

    x = Math.min(Math.max(x, 0), rect.width);

    this._updateButtonPosition(x);
    this._updateLabelPosition(x);
    this._updateLabelArrowPosition();
    this._findTargetStepByPosition();
    this._syncValueWithTargetStep();
  }

  /**
   * update button x position
   * @param x x position
   */
  private _updateButtonPosition(x: number): void {
    this.renderer.setStyle(this.sliderButton, 'left', `${x}px`);
  }

  /**
   * update label position
   * @param x x should be button position
   */
  private _updateLabelPosition(x: number): void {
    x = Math.min(Math.max(x - 12.5, 0), this.host.offsetWidth - 50);

    this.renderer.setStyle(this.label, 'left', `${x}px`);
  }

  /**
   * update label x position
   */
  private _updateLabelArrowPosition(): void {
    const x = 12 + this.sliderButton.offsetLeft - this.label.offsetLeft;

    this.renderer.setStyle(this.labelArrow, 'left', `${x}px`);
  }

  /**
   * find target step by button position
   * @param left left position of button
   */
  private _findTargetStepByPosition(left: number = this.sliderButton.offsetLeft): void {
    const distances = this._sliderSteps.map(step => Math.abs(left - step.x));
    const distance = Math.min(...distances);

    this._targetStep = this._sliderSteps[distances.indexOf(distance)];
  }

  /**
   * find target step by value
   */
  private _findTargetStepByValue(): void {
    this._targetStep = this._sliderSteps.find(step => step.value === this.value);
  }

  /**
   * synchronize value with target step
   */
  private _syncValueWithTargetStep(): void {
    this.value = this._targetStep.value;
  }

  /**
   * move button and label to target step-able position
   */
  private _moveToTargetPosition(): void {
    if (this._targetStep) {
      this._updateButtonPosition(this._targetStep.x);
      this._updateLabelPosition(this._targetStep.x);
      this._updateLabelArrowPosition();
    }
  }

  /**
   * remove grab moving event from the window
   */
  private _removeGrabMovingEvent(): void {
    window.removeEventListener('mousemove', this._grabMovingHandler);
    window.removeEventListener('touchmove', this._grabMovingHandler);
  }

  /**
   * add grab release event to window
   */
  private _addReleaseEvent(): void {
    window.addEventListener('mouseup', this._grabReleaseHandler);
    window.addEventListener('touchend', this._grabReleaseHandler);
  }

  /**
   * call `releaseButton` method when the user release grabbing
   */
  private _grabReleaseHandler = (): void => {
    this.releaseButton();
  }

  /**
   * remove grab release handler event from window
   */
  private _removeReleaseEvent(): void {
    window.removeEventListener('mouseup', this._grabReleaseHandler);
    window.removeEventListener('touchend', this._grabReleaseHandler);
  }

  /**
   * move button to clicked position
   * @param event event
   */
  onTrackClick(event: MouseEvent): void {
    const rect = this.sliderTrack.getBoundingClientRect();
    let x = event.x - rect.x;

    x = Math.min(Math.max(x, 0), rect.width);

    this._findTargetStepByPosition(x);
    this._moveToTargetPosition();
    this._syncValueWithTargetStep();
    this.setValue(this.value);
  }
}
