import {ChangeDetectorRef, Component, ElementRef, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {FormControlBaseDirective} from '../../../base/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NumberInputDirective} from '../../../common/number-input/number-input.directive';

@Component({
  selector: 'app-weight-input',
  templateUrl: './weight-input.component.html',
  styleUrls: ['./weight-input.component.scss'],
  animations: [
    trigger('pop', [
      state('void', style({
        opacity: 0,
        transform: 'translate(-50%, 50%)',
      })),
      state('pop', style({
        opacity: 1,
        transform: 'translate(-50%, 0)',
      })),
      transition('void <=> pop', animate('.15s cubic-bezier(0,1.2,1,1)')),
    ])
  ]
})
export class WeightInputComponent extends FormControlBaseDirective<number> implements OnInit {
  // number input element ref
  @ViewChild('numberInput') numberInputRef: ElementRef<HTMLInputElement>;
  // number input directive
  @ViewChild(NumberInputDirective) numberInputDirective: NumberInputDirective;
  // value
  value = '';

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
    this._defaultValue = 0;
  }

  /**
   * return number input element
   */
  get input(): HTMLInputElement {
    return this.numberInputRef?.nativeElement;
  }

  /**
   * write value to input element
   * @param value value to write
   */
  writeValue(value: number): void {
    this.value = value?.toString() || '0';
  }

  /**
   * set changed value to component
   * @param value changed value in string
   */
  onValueChange(value: string): void {
    if (value !== undefined) {
      this.markAsDirty();
      this.setValue(parseFloat(value));
    }
  }
}
