import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-animating-number',
  templateUrl: './animating-number.component.html',
  styleUrls: ['./animating-number.component.scss']
})
export class AnimatingNumberComponent implements OnInit, AfterViewInit {
  // animation duration
  @Input() duration = 1500;
  // number digits info
  @Input() numberDigits: string;

  /**
   * set target value to animate
   * @param value value
   */
  @Input() set value(value: number) {
    this._value = 0;
    this._targetValue = value;
    this.startAnimation();
  }
  // displaying value
  private _value: number;
  // target value
  private _targetValue: number;
  // start time of animation
  private _startTime: number;
  // animation frame
  private _frame: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startAnimation();
  }

  /**
   * return displaying value
   */
  get value(): number {
    return this._value;
  }

  /**
   * start animation
   */
  startAnimation(): void {
    this._frame = requestAnimationFrame(this._animateValue);
  }

  /**
   * animate value to target value
   * @param time animation started time
   */
  private _animateValue = (time: number): void => {
    if (!this._startTime) {
      this._startTime = time;
    }

    const timePassed = time - this._startTime;

    this._value = Math.min(Math.ceil(this._targetValue * (timePassed / this.duration)), this._targetValue);

    if (this._value === this._targetValue) {
      cancelAnimationFrame(this._frame);
    } else {
      this._frame = requestAnimationFrame(this._animateValue);
    }
  }
}
