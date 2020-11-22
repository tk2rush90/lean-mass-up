import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, NgModel} from '@angular/forms';

@Pipe({
  name: 'hasError'
})
export class HasErrorPipe implements PipeTransform {

  /**
   * return `true` when control has error after touched or dirty
   * @param control control to check error
   * @param error error code
   */
  transform(control: AbstractControl | NgModel, error: string): boolean {
    return !!((control.dirty || control.touched) && control.errors[error]);
  }

}
