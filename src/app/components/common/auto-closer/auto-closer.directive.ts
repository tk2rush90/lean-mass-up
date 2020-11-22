import {AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {getElement} from '../../../utils/element.util';
import {neutralizeEvent} from '../../../utils/event.util';

@Directive({
  selector: '[appAutoCloser]'
})
export class AutoCloserDirective implements AfterViewInit, OnDestroy {
  // set closer container
  // closer will emit autoClose emitter when actions detected from the outside of the container
  @Input() closerContainer: ElementRef<HTMLElement> | HTMLElement;
  // set true will emit autoClose when the scroll event triggered from the outside of the container
  @Input() set closeOnScroll(state: boolean) {
    this._useScrollDetector = state;
    this._removeScrollEvent();
    this._addScrollEvent();
  }
  // the container component should close options when
  // autoClose emitted
  @Output() autoClose: EventEmitter<void> = new EventEmitter<void>();
  // flag to check for using scroll detection
  private _useScrollDetector = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public elementRef: ElementRef<HTMLElement>
  ) {
    this._checkTargetContained = this._checkTargetContained.bind(this);
    this._addClickEvent();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this._removeClickEvent();
    this._removeScrollEvent();
  }

  /**
   * return host element
   */
  get host(): HTMLElement {
    return getElement(this.elementRef);
  }

  /**
   * get container element
   */
  get container(): HTMLElement {
    return getElement(this.closerContainer);
  }

  /**
   * check target contained state
   * if target is not contained in the container,
   * then autoClose will be emitted
   * @param event event
   */
  private _checkTargetContained(event: Event): void {
    if (!this.container.contains(event.target as HTMLElement)) {
      this.autoClose.emit();
    } else if ((event.type === 'scroll' || event.type === 'wheel') && !this.host.contains(event.target as HTMLElement)) {
      // if target is contained in the container
      // but if not contained in the host element,
      // neutralize all event
      neutralizeEvent(event);
    }
  }

  /**
   * add scroll event
   */
  private _addScrollEvent(): void {
    if (this._useScrollDetector) {
      this.document.addEventListener('scroll', this._checkTargetContained, {capture: true, passive: false});
      this.document.addEventListener('wheel', this._checkTargetContained, {capture: true, passive: false});
    }
  }

  /**
   * remove scroll event
   */
  private _removeScrollEvent(): void {
    if (this._useScrollDetector) {
      this.document.removeEventListener('scroll', this._checkTargetContained, {capture: true});
      this.document.removeEventListener('wheel', this._checkTargetContained, {capture: true});
    }
  }

  /**
   * add click event
   */
  private _addClickEvent(): void {
    this.document.addEventListener('click', this._checkTargetContained, {capture: true});
  }

  /**
   * remove click event
   */
  private _removeClickEvent(): void {
    this.document.removeEventListener('click', this._checkTargetContained, {capture: true});
  }
}
