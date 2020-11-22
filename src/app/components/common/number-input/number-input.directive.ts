import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostListener, Input, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '../../base/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {getAvailableNumber, removeFloatingNumbers, removeLeadingZeros} from '../../../utils/number.util';

@Directive({
  selector: 'input[appNumberInput]'
})
export class NumberInputDirective extends FormControlBaseDirective<string> implements AfterViewInit {
  // min value
  @Input() min = 0;
  // max value
  @Input() max = 0;
  // set fixed position
  // floating numbers under this position will be removed
  @Input() fixed = 2;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLInputElement>,
  ) {
    super(ngControl, changeDetectorRef);
    this._defaultValue = '0';
  }

  get input(): HTMLInputElement {
    return this.elementRef?.nativeElement;
  }

  /**
   * mark as touched when host blurred
   */
  @HostListener('blur')
  onHostBlur(): void {
    this.markAsTouched();
  }

  /**
   * handle host input to transform form value
   * @param event event
   */
  @HostListener('input', ['$event'])
  onHostInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = removeLeadingZeros(value);
    value = removeFloatingNumbers(value, this.fixed);
    value = getAvailableNumber(value, this.min, this.max);

    this.markAsDirty();
    this.setValue(value);

    input.value = value;
  }

  /**
   * write value to input element
   * @param value value to write
   */
  writeValue(value: string): void {
    if (this.input) {
      this.input.value = value;
    }
  }
}
