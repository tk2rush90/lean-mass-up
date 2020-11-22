import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatingNumberComponent } from './animating-number.component';



@NgModule({
  declarations: [AnimatingNumberComponent],
  exports: [
    AnimatingNumberComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AnimatingNumberModule { }
