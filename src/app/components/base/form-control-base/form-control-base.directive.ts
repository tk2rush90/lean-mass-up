import {AbstractControl, ControlValueAccessor, NgControl, ValidationErrors} from '@angular/forms';
import {AfterViewInit, ChangeDetectorRef, Directive, HostBinding, Optional, Self} from '@angular/core';

@Directive({
  selector: '[appFormControlBase]',
})
export class FormControlBaseDirective<T> implements AfterViewInit, ControlValueAccessor {
  // return true when control has error
  @HostBinding('class.ts-error') get hasError(): boolean {
    return this._getControlField('invalid') && (this._getControlField('touched') || !this._getControlField('pristine'));
  }
  // return disabled state
  @HostBinding('class.ts-disabled') get disabled(): boolean {
    return this._getControlField('disabled');
  }
  // registered change function
  private _onChange;
  // registered touched function
  private _onTouched;
  // default value
  protected _defaultValue: T;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  /**
   * write current value when view init
   */
  ngAfterViewInit(): void {
    this.writeValue(this.getValue() || this._defaultValue);
    this.changeDetectorRef.detectChanges();
  }

  get dirty(): boolean {
    return this.ngControl?.control?.dirty;
  }

  get touched(): boolean {
    return this.ngControl?.control?.touched;
  }

  /**
   * return `true` when field has error code
   * @param code code
   */
  hasErrorCode(code: string): boolean {
    return this.ngControl?.control?.hasError(code);
  }

  /**
   * set value
   * @param value value to set
   */
  setValue(value: T): void {
    this._callControlMethod('setValue', value);
  }

  /**
   * return form control value
   */
  getValue(): T {
    return this._getControlField('value');
  }

  /**
   * disable the control
   */
  setDisable(): void {
    this._callControlMethod('disable');
  }

  /**
   * enable the control
   */
  setEnable(): void {
    this._callControlMethod('enable');
  }

  /**
   * should override this method from the extended component
   * @param value value to set
   */
  writeValue(value: T): void {
  }

  /**
   * register change function
   * @param fn change function
   */
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  /**
   * register touched function
   * @param fn touched function
   */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  /**
   * mark as touched
   */
  markAsTouched(): void {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  /**
   * mark as dirty
   */
  markAsDirty(): void {
    if (this._onChange) {
      this._onChange();
    }
  }

  /**
   * set validation errors
   * @param errors errors
   */
  setErrors(errors: ValidationErrors): void {
    this._callControlMethod('setErrors', errors);
  }

  /**
   * get errors from control
   */
  getErrors(): ValidationErrors {
    const errors = {};
    const previousErrors = this._getControlField('errors') || {};

    Object.keys(previousErrors).forEach(key => {
      errors[key] = previousErrors[key];
    });

    return errors;
  }

  /**
   * return host control
   */
  getControl(): AbstractControl {
    if (this.ngControl && this.ngControl.control) {
      return this.ngControl.control;
    }
  }

  /**
   * get control field with checking control existence
   * @param field field of control
   */
  private _getControlField(field: keyof AbstractControl): any {
    const control = this.getControl();

    if (control) {
      return control[field];
    }
  }

  /**
   * call control method with checking control existence
   * @param method method to call
   * @param params params for method
   */
  private _callControlMethod(method: keyof AbstractControl, ...params: any): void {
    const control = this.getControl();

    if (control) {
      control[method](...params);
    }
  }
}
