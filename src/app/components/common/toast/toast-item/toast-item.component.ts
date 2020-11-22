import {Component, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ToastType} from '../models/toast';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-toast-item',
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.scss'],
  animations: [
    trigger('toast', [
      state('void', style({
        transform: 'translate(-50%, 100%)',
        opacity: 0,
      })),
      state('show', style({
        transform: 'translate(-50%, 0)',
        opacity: 1,
      })),
      transition('void <=> show', animate('.15s cubic-bezier(0,1.06,.83,1.12)')),
    ])
  ]
})
export class ToastItemComponent implements OnInit, OnDestroy {
  // toast type
  @HostBinding('attr.lmu-type') type: ToastType;
  // bind toast animation
  @HostBinding('@toast') toast = 'show';
  // toast message
  message: string;
  // emit when countdown is ended
  toastClose: EventEmitter<void> = new EventEmitter();
  // emit after component destroyed
  destroyed: EventEmitter<void> = new EventEmitter();
  // toast countdown timer
  private _countdown = 5;
  // timeout timer
  private _timer: any;

  constructor() { }

  ngOnInit(): void {
    this._startCountDown();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  /**
   * emit toast close action when host closed
   */
  @HostListener('click')
  onHostClick(): void {
    clearTimeout(this._timer);
    this.toastClose.emit();
  }

  /**
   * emit destroyed emitter after end of voiding
   * @param event animation event
   */
  @HostListener('@toast.done', ['$event'])
  onToastAnimationEnd(event: AnimationEvent): void {
    if (event.toState === 'void') {
      this.destroyed.emit();
    }
  }

  /**
   * start countdown to close toast automatically
   */
  private _startCountDown = (): void => {
    clearTimeout(this._timer);

    this._countdown--;

    if (this._countdown < 0) {
      this.toastClose.emit();
    } else {
      this._timer = setTimeout(this._startCountDown, 1000);
    }
  }
}
