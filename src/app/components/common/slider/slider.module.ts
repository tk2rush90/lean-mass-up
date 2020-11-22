import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import {FormControlBaseModule} from '../../base/form-control-base/form-control-base.module';



@NgModule({
  declarations: [SliderComponent],
  exports: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    FormControlBaseModule,
  ]
})
export class SliderModule { }
