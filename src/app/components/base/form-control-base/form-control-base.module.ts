import {NgModule} from '@angular/core';
import {FormControlBaseDirective} from './form-control-base.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    FormControlBaseDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormControlBaseDirective,
  ]
})
export class FormControlBaseModule {}
