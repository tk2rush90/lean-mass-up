import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberInputDirective } from './number-input.directive';
import {FormControlBaseModule} from '../../base/form-control-base/form-control-base.module';



@NgModule({
  declarations: [NumberInputDirective],
  exports: [
    NumberInputDirective
  ],
  imports: [
    CommonModule,
    FormControlBaseModule,
  ]
})
export class NumberInputModule { }
