import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RenderableLetter} from '../../../models/logo/renderable-letter';
import {randomNumber} from '../../../utils/random.util';
import {LOGO_DARKEN_VALUE, LOGO_MAX_HEX} from '../../../constants/logo';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit, AfterViewInit, OnDestroy {
  // set `true` to render logo with fade-in animation
  @Input() renderWithAnimation = false;
  // emit when all letters are rendered
  @Output() renderEnd: EventEmitter<void> = new EventEmitter<void>();
  // title segments
  titles: string[] = [
    'LEAN MASS UP',
    'DIET',
  ];
  // letters to render
  letters: (RenderableLetter[])[] = [];
  // frame for `requestAnimationFrame`
  private _lettersFrame: number;
  // timeout timer list
  private _timeOuts: any[] = [];
  // max hex
  private readonly _maxHex = LOGO_MAX_HEX;
  // every darken value
  private readonly _darkenValue = LOGO_DARKEN_VALUE;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._splitLettersFromTitle();
  }

  ngAfterViewInit(): void {
    this._render();
  }

  ngOnDestroy(): void {
    this._stopRendering();
    this._stopTimers();
  }

  /**
   * return `true` when all letters are rendered
   */
  get rendered(): boolean {
    return this.letters.every(letters => letters.every(letter => letter.rendered));
  }

  /**
   * split letters from title segments
   */
  private _splitLettersFromTitle(): void {
    this.letters = this.titles.map(title => title.split('').map(letter => new RenderableLetter(letter)));
  }

  /**
   * render logo text
   */
  private _render(): void {
    if (this.renderWithAnimation) {
      this._lettersFrame = requestAnimationFrame(this._renderLetters);
    } else {
      this._showAllLetters();
    }
  }

  /**
   * stop letters rendering
   */
  private _stopRendering(): void {
    cancelAnimationFrame(this._lettersFrame);
  }

  /**
   * show all letters at once
   */
  private _showAllLetters(): void {
    this.letters.forEach(letters => {
      letters.forEach(letter => letter.darken(this._maxHex));
    });

    this.changeDetectorRef.detectChanges();
  }

  /**
   * darken the letters to display
   * the order is randomly determined by code
   */
  private _renderLetters = (): void => {
    this.letters.forEach(letters => {
      const renderableLetters = letters.filter(item => !item.rendered);
      const index = randomNumber(0, renderableLetters.length);
      const letter = renderableLetters[index];

      if (letter) {
        const timer = setTimeout(() => letter.darken(this._darkenValue), 10);

        this._timeOuts.push(timer);
      }
    });

    if (this.rendered) {
      this._stopRendering();
      this.renderEnd.emit();
    } else {
      this._lettersFrame = requestAnimationFrame(this._renderLetters);
    }
  }

  /**
   * stop all timers
   */
  private _stopTimers(): void {
    this._timeOuts.forEach(item => clearTimeout(item));
  }
}
