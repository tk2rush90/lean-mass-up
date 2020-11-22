import {AbstractControl} from '@angular/forms';

/**
 * set `invalidZero` error when value is `0`
 * @param control control
 */
export function ZeroValidator(control: AbstractControl): any | null {
  if (control) {
    if (parseFloat(control.value) === 0) {
      return {
        invalidZero: true,
      };
    }
  }
}

/**
 * set `invalidText` error when value is empty text after trimming
 * @param control control
 */
export function TextValidator(control: AbstractControl): any | null {
  if (control) {
    if (!(control.value || '').trim()) {
      return {
        invalidText: true,
      };
    }
  }
}
