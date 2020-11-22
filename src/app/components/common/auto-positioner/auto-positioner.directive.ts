import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding, HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {getElement, getStyle} from '../../../utils/element.util';

export type AutoPositionerVerticalPriority = 'top' | 'bottom' | 'auto';
export type AutoPositionerHorizontalPriority = 'left' | 'right' | 'auto';

@Directive({
  selector: '[appAutoPositioner]',
  exportAs: 'positioner',
})
export class AutoPositionerDirective implements OnInit, AfterViewInit, OnDestroy {
  // set width
  @Input() set width(width: string | number) {
    this._width = parseFloat(width as any);
  }
  // set max width
  @Input() set maxWidth(width: string | number) {
    this._maxWidth = parseFloat(width as any);
  }
  // use auto width
  @Input() autoWidth = false;
  // position container
  @Input() positionContainer: ElementRef<HTMLElement> | HTMLElement;
  // vertical position gap
  @Input() verticalGap = 0;
  // horizontal position gap
  @Input() horizontalGap = 0;
  // vertical position priority
  // if both top/bottom positions are available/unavailable,
  // the component should use priority position
  @Input() verticalPriority: AutoPositionerVerticalPriority = 'auto';
  // horizontal position priority
  // if both left/right positions are available/unavailable,
  // the component should use priority position
  @Input() horizontalPriority: AutoPositionerHorizontalPriority = 'auto';
  // set host visibility style
  @HostBinding('style.visibility') get visibility(): 'visible' | 'hidden' {
    return this._visible ? 'visible' : 'hidden';
  }
  // opacity for ie
  @HostBinding('style.opacity') get opacity(): number {
    return this._visible ? 1 : 0;
  }
  // timer
  private _timer;
  // previous display style
  private _previousDisplay: string;
  // host visible state
  private _visible = false;
  // request animation frame
  private _frame;
  // previous container y position
  private _previousTop: number;
  // previous container x position
  private _previousLeft: number;
  // component width
  private _width: number;
  // max width
  private _maxWidth: number;

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this._observePositionChange = this._observePositionChange.bind(this);
  }

  ngOnInit(): void {
    this._setPreviousDisplay();
  }

  ngAfterViewInit(): void {
    this.calculate();
  }

  ngOnDestroy(): void {
    this._cancelWatchers();
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
    return getElement(this.positionContainer);
  }

  /**
   * get scroll container
   */
  get scrollContainer(): HTMLElement {
    let target = this.host.parentElement;

    while (target) {
      const overflowX = getStyle(target, 'overflow-x');
      const overflowY = getStyle(target, 'overflow-y');

      if ((overflowX && overflowX !== 'visible') || (overflowY && overflowY !== 'visible')) {
        break;
      }

      target = target.parentElement;
    }

    return target || this.document.body;
  }

  /**
   * calculate
   */
  calculate(): void {
    this._cancelWatchers();
    this._timer = setTimeout(() => {
      this._calculateAvailablePosition(true);
      // start observing changes
      this._observePositionChange();
    });
  }

  /**
   * hide host with display
   */
  private _hideHost(): void {
    this.renderer2.setStyle(this.host, 'display', 'none');
  }

  /**
   * show host with display
   */
  private _showHost(): void {
    this.renderer2.setStyle(this.host, 'display', this._previousDisplay);
  }

  /**
   * set previous display
   * the host element display will be none while calculating position
   * after calculating, previous display style will be set to host element
   */
  private _setPreviousDisplay(): void {
    this._previousDisplay = getStyle(this.host, 'display');
  }

  /**
   * calculate available position
   * @param hideBeforeCalculate if set true, hide host element before calculate
   */
  private _calculateAvailablePosition(hideBeforeCalculate = false): void {
    // elements
    const hostRect = this.host.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    const scrollContainerRect = this.scrollContainer.getBoundingClientRect();
    const hostSize = {
      // if width not set, default is container width when autoWidth is `false`
      width: this._width || (this.autoWidth ? null : containerRect.width),
      height: hostRect.height,
    };

    if (hideBeforeCalculate) {
      // hide host before calculating
      this._hideHost();
    }

    const horizontal = this._getHorizontalPosition(hostSize, containerRect, scrollContainerRect);
    const vertical = this._getVerticalPosition(hostSize, containerRect, scrollContainerRect);

    let x: number;
    let y: number;

    // calculate x axis value
    if (horizontal === 'left') {
      x = containerRect.left + containerRect.width - hostSize.width - this.horizontalGap;
    } else {
      x = containerRect.left + this.horizontalGap;
    }

    // calculate y axis value
    if (vertical === 'top') {
      y = containerRect.top - hostSize.height - this.verticalGap;
    } else {
      y = containerRect.top + containerRect.height + this.verticalGap;
    }

    this._previousLeft = containerRect.left;
    this._previousTop = containerRect.top;

    // set fixed positions
    this.renderer2.setStyle(this.host, 'top', `${y}px`);
    this.renderer2.setStyle(this.host, 'left', `${x}px`);
    this.renderer2.setStyle(this.host, 'width', `${hostSize.width}px`);
    // remove min width/height to prevent element spreads to wide
    this.renderer2.setStyle(this.host, 'min-width', 0);
    this.renderer2.setStyle(this.host, 'min-height', 0);
    this.renderer2.setStyle(this.host, 'position', 'fixed');

    // set max width
    if (this._maxWidth) {
      this.renderer2.setStyle(this.host, 'max-width',  `${this._maxWidth}px`);
    }

    this._showHost();
    this._visible = true;
  }

  /**
   * get horizontal position
   * @param hostSize host width and height
   * @param containerRect container dom rect
   * @param scrollContainerRect scroll container dom rect
   */
  private _getHorizontalPosition(
    hostSize: { width: number, height: number },
    containerRect: DOMRect,
    scrollContainerRect: DOMRect,
  ): AutoPositionerHorizontalPriority {
    const left = containerRect.left + containerRect.width - hostSize.width - this.horizontalGap;
    const right = containerRect.left + hostSize.width + this.horizontalGap;

    const leftAvailable = scrollContainerRect.left < left && left > 0;
    const rightAvailable = scrollContainerRect.left + scrollContainerRect.width > right && right < window.innerWidth;

    if (leftAvailable === rightAvailable) {
      if (this.horizontalPriority === 'auto') {
        const leftSpace = containerRect.left - scrollContainerRect.left;
        const rightSpace = (scrollContainerRect.left + scrollContainerRect.width) - (containerRect.left + containerRect.width);

        return leftSpace > rightSpace ? 'left' : 'right';
      } else {
        return this.horizontalPriority;
      }
    } else if (leftAvailable) {
      return 'left';
    } else {
      return 'right';
    }
  }

  /**
   * get vertical position
   * @param hostSize host width and height
   * @param containerRect container dom rect
   * @param scrollContainerRect scroll container dom rect
   */
  private _getVerticalPosition(
    hostSize: { width: number, height: number },
    containerRect: DOMRect,
    scrollContainerRect: DOMRect,
  ): AutoPositionerVerticalPriority {
    const top = containerRect.top - hostSize.height - this.verticalGap;
    const bottom = containerRect.top + containerRect.height + hostSize.height + this.verticalGap;

    const topAvailable = scrollContainerRect.top < top && top > 0;
    const bottomAvailable = scrollContainerRect.top + scrollContainerRect.height > bottom && bottom < window.innerHeight;

    if (topAvailable === bottomAvailable) {
      if (this.verticalPriority === 'auto') {
        const topSpace = containerRect.top - scrollContainerRect.top;
        const bottomSpace = (scrollContainerRect.top + scrollContainerRect.height) - (containerRect.top + containerRect.height);

        return topSpace > bottomSpace ? 'top' : 'bottom';
      } else {
        return this.verticalPriority;
      }
    } else if (topAvailable) {
      return 'top';
    } else {
      return 'bottom';
    }
  }

  /**
   * observe position change
   */
  private _observePositionChange(): void {
    const containerRect = this.container.getBoundingClientRect();

    if (this._previousTop !== containerRect.top || this._previousLeft !== containerRect.left) {
      this._calculateAvailablePosition();
    }

    this._frame = requestAnimationFrame(this._observePositionChange);
  }

  /**
   * stop propagation scroll event
   * @param event event
   */
  @HostListener('scroll', ['$event'])
  onHostScroll(event: Event): void {
    event.stopPropagation();
  }

  /**
   * cancel watchers
   */
  private _cancelWatchers(): void {
    clearTimeout(this._timer);
    cancelAnimationFrame(this._frame);
  }
}
