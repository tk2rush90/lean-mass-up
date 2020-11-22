import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './box.component';



@NgModule({
  declarations: [BoxComponent],
  exports: [
    BoxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BoxModule { }
